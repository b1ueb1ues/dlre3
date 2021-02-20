// god like
//gl.dummy();
//gl.sp();
//gl.attack(10000);
//gl.invincible();

// save the day
savetheday();

// time init
var g_gpt = new NativeFunction(m.lib_base.add(
    offset.maingamectrl.getgameplaytime
),'float', ['pointer']);
var g_mgc = new NativeFunction(m.lib_base.add(
    offset.maingamectrl.get_instance
),'pointer', []);
var mgc = null;
function now_init(){ 
    mgc = g_mgc(); 
    return mgc;
}
function now() { return g_gpt(mgc).toFixed(3); }

/**
 * send t0 first
 */
if(now_init()==0)
    send({hook:'init', t0:0});
else
    send({hook:'init', t0:now()});

hook(
offset.maingamectrl.playqueststart,
{
    onEnter: function(args){
        now_init();
        send({hook:'start', t0:0});
        console.error('quest_start\n==============================');
    },
    onLeave: function(retval){
    }
});


var log = {};
function log_clean(log) {
    log.dirty  = 0;
    log.label  = null;
    log.type   = null;
    log.dmg    = 0;
    log.comment = '';
    log.iscrit = 0;
    log.src    = null;
    log.dst    = null;
    log.aid    = null;
    log.sid    = null;
    log.ts     = -1;
}
log_clean(log);



function parse_cb(cb) {
    var o_cb = offset.characterbase;
    var o_cha = offset.collisionhitattribute;
    var o_cid = offset.characterid;
    var o_dragon = offset.dragoncharacter

    var ct, dpi, dpp, aid, cid, idx, did;

    if(cb && cb != 0) {
        ct =     cb.add(  o_cb.charactertype           ).readInt(); 
        cid =     cb.add(  o_cb.characterid             ).readInt(); 
        dpi =    cb.add(  o_cb.dungeonpartyindex       ).readInt(); 
        dpp =    cb.add(  o_cb.dungeonpartyposition    ).readInt(); 
        var p_mpid = cb.add(  o_cb.multiplayid             ).readPointer(); 

        var did = ''+cid;
        if (ct==0 && did[0] == '2'){  //dragon
            cb = cb.add( o_dragon.human).readPointer();
            did = cid;
            cid = cb.add( o_cb.characterid).readInt();
        } else {
            did = 0;
        }

        if (p_mpid != 0){
            aid = p_mpid.add( o_cid.actorid  ).readU8(); 
            idx = p_mpid.add( o_cid.index    ).readU8(); 
        }
        else{
            aid = -1;
            idx = -1;
        }
    } else {
        ct = 0;
        dpi = 0;
        dpp = 0;
        aid = -2;
        cid = -1;
        did = 0;
        idx = -2;
    }

    var r = {
        ctype    : '_',
        cid      : cid,
        did      : did,
        team     : dpi,
        inteam   : dpp,
        player   : aid,
        inplayer : idx
    }
    if (ct == 0)
        r.ctype = 'p';
    else if (ct == 1)
        r.ctype = 'e';
    return r;
}

function commit(log) {

    if (!log.dst || log.dst == 0) {
        print('must have dst');
        errrrrrrrrrrrrrrrrr();
    }

    var from = parse_cb(log.src);
    var to = parse_cb(log.dst);

    var dtype;
    if (log.type == 'dmg') {
        if (log.iscrit) 
            dtype = 'dmg_crit:'
        else
            dtype = 'dmg:'
    }else if(log.type == 'dot'){
        dtype = 'dmg_dot:'
    }else if(log.type == 'admg'){
        dtype = 'dmg_add:'
    }else if(log.type == 'buff'){
        dtype = 'buff:'
    }else {
        dtype = 'unknown:'
    }

    var ts;
    if (log.ts == -1)
        ts = now();
    else
        ts = log.ts

    var skada = {
        ts      : ts,
        hook    : log.label,
        from    : from,
        to      : to,
        aid     : log.aid,
        sid     : log.sid,
        dtype   : dtype,
        dmg     : log.dmg,
        comment : log.comment
    }
    send(skada);
    log_clean(log);
}

function recount(){
//args:label, type, dmg, iscrit, src, dst, aid, sid
    if (log.dirty && log.dst)
        commit(log);
    log.dirty = 1;
    log.ts = now();
}


function at2name(at){
    switch (at) {
        case 0  : return 'none';
        case 1  : return 'poison';
        case 2  : return 'burn';
        case 3  : return 'freeze';
        case 4  : return 'paralys';
        case 5  : return 'blind';
        case 6  : return 'stun';
        case 7  : return 'curse';
        case 8  : return 'rebirth';
        case 9  : return 'bog';
        case 10 : return 'sleep';
        case 11 : return 'frostb';
        case 12 : return 'flashh';
        case 13 : return 'cwind';
        case 14 : return 'darka';
        case 15 : return 'dfire';
        case 99 : return 'all';
        default : return 'null';
    } 
}


hook( 
offset.characterbase.showdamageui
,{ 
    onEnter: function(args){
        log.dst = args[0];
        var src = args[1];
        log.dmg = args[2].toInt32();
        log.iscrit = args[3].toInt32();
        var atype = args[6].toInt32();;

        var sp = this.context.sp;
        var isskill = sp.add(0x8).readU8();
        var extra_owner = sp.add(0x18).readPointer();
        var icon = sp.add(0x20).readInt();
        var addition_attacker = sp.add(0x30).readPointer();
        var isa = sp.add(0x38).readU8();

        //type
        if (isa)
            log.type = 'admg';
        else if(src==0)
            log.type = 'dot';
        else
            log.type = 'dmg';

        // src
        if (isa)
            log.src = 0;
        else if (log.src===null)
            log.src = src;

        //id
        if(log.type == 'dot') {
            log.aid = atype;
            log.sid = at2name(atype);
        }

        //ts
        if (log.ts == -1)
            log.ts = now();

        commit(log);
    },
    onLeave: function(ret){
    }
});

if (1)
hook( 
offset.chainctrl.add
,{ 
    onEnter: function(args){
        var tis = args[0];
        var pc = args[1];
        var tmp = {}
        recount();
        log.aid = args[2].toInt32();
        log.sid = args[3].toInt32();
        log.label = 'combo::add';
    },
    onLeave: function(ret){
    }
});


if (1)
hook(
offset.characterbufftriggerreactionbomb.execdebuffextradamage
,{
    onEnter: function(args) {
        var tis = args[0];
        var p_br = args[1];
        var actioncontainer = tis.add(
            offset.characterbufftriggerreactionbomb.container
        ).readPointer();

        recount();
        log.src = p_br.add(
            offset.buffrecord.src
        ).readPointer();
        log.aid = actioncontainer.add(
            offset.actioncontainer.actionid
        ).readS32();
        log.label = 'buffbomb::eded'
    },
    onLeave: function(ret){
    }
});


if (1)
hook(
offset.characterbuff.apply
,{
    onEnter: function (args) {
        var conid = args[3].toInt32();
        if(conid == 0) 
            return;

        var o_cha = offset.collisionhitattribute;

        var tmp = {};
        tmp.dst = args[1];
        var cha = args[2];
        if (cha == 0)
            return;
        var optionsrc = args[4];
        var csstr_hitlabel = arrow(cha, o_cha.id);
        var hitlabel = csstr_hitlabel.add(0x14).readUtf16String();
        tmp.src = arrow(cha, o_cha.owner);  
        tmp.label = 'cbuff::apply';
        tmp.type = 'buff';
        tmp.aid = cha.add( o_cha.actionid  ).readInt();
        tmp.sid = cha.add( o_cha.skillid   ).readInt();
        tmp.ts = now();
        tmp.dmg = 0;
        tmp.comment = hitlabel + ' ac:' + conid;

        commit(tmp);
    }
});

if (1)
hook(
offset.characterbuff.applybyability
,{
    onEnter: function (args) {
        var conid = args[3].toInt32();
        if(conid == 0) 
            return;

        var tmp = {};
        tmp.dst = args[1];
        tmp.src = args[2];
        tmp.aid = args[4].toInt32();
        tmp.sid = args[5].toInt32();
        tmp.label = 'cbuff::ability';
        tmp.type = 'buff';
        tmp.ts = now();
        tmp.dmg = 0;
        tmp.comment = 'ac:' + conid;

        commit(tmp);
    }
});

//CharacterBase$$ApplyDamage
if (1)
hook(offset.characterbase.applydamage, {
    onEnter: function(args){
        var o_cdi = offset.characterdamageintermediate;
        var o_cha = offset.collisionhitattribute;

        var cdi = args[1];
        var cha = cdi.add( o_cdi.collisionhitattribute ).readPointer(); // collisionhitattribute

        recount();
        log.aid = cha.add( o_cha.actionid  ).readInt();
        log.sid = cha.add( o_cha.skillid   ).readInt();
        log.label = 'cbase::applydmg';
    },
    onLeave: function(retval){
    }
});


function afflic(ab, cha, ace) {
    var atype = ptr(ace).add(
        offset.actionconditionelement.atype
    ).readS32();

    var cb = arrow(ab, offset.abnormalstatusbase.owner);
    if (cb == 0)
        return;
    var cparam = arrow(cb, offset.characterbase.characterparameter);
    var paramtotal = arrow(cparam, offset.characterparameter.fptotal);
    var resists = arrow(paramtotal, offset.fluctuationparameter.abnormalresist);
    //showresist(resists);
    var resist = resists.add(0x20+atype*4).readFloat().toFixed(2);

    var rate = arrow.i(ace, offset.actionconditionelement.rate);

    var dst = cb;
    var src = 0;
    if (cha != 0)
        var src = arrow(cha, offset.collisionhitattribute.owner);

    var tmp = {};
    tmp.dst = dst;
    tmp.src = src;
    tmp.aid = at2name(atype);
    tmp.sid = 'rate:'+rate;
    tmp.label = 'afflic';
    tmp.type = 'buff';
    tmp.ts = now();
    tmp.dmg = 0;
    tmp.comment = 'resist:' + resist;

    commit(tmp);
}

hook(
offset.abnormalstatusbase.setup
,{
    onEnter: function(args){
        var tis = args[0];
        var cb = args[1];
        var cha = args[2];
        var ace = args[3];
        afflic(tis, cha, ace);
    }
});


hook(
offset.abnormalstatusenemybase.addition
,{
    onEnter: function(args){
        var tis = args[0];
        var cha = args[1];
        var ace = args[2];
        afflic(tis, cha, ace);
    }
});


