// god like
//gl.dummy();
//gl.sp();
//gl.attack(10000);
//gl.invincible();

// save the day
savetheday();

// time init
var g_gpt = new NativeFunction(lib_base.add(
    offset.maingamectrl.getgameplaytime
),'float', ['pointer']);
var g_mgc = new NativeFunction(lib_base.add(
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
    send(0,tone);
else
    send(now(),tone);


hook(
offset.maingamectrl.playqueststart,
{
    onEnter: function(args){
        now_init();
        send(0, tone);
        var s = 'timestamp,hook,cid,[,ctype,didx,dposition,multiplay_id,multiplay_index,],dst,<actionid>,<skillid>,iscrit,dmg'
        s += ',-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-'
        send(s, tzero);
        send('quest_start\n==============================', tstderr);
    },
    onLeave: function(retval){
    }
});


function csv() {
    var r = '';
    for (var i in arguments) {
        if (i==0)
            r += arguments[i];
        else
            r = r + ',' + arguments[i];
    }
    return r
}


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

function commit(log) {
    var o_cb = offset.characterbase;
    var o_cha = offset.collisionhitattribute;
    var o_ci = offset.characterid;
    var o_dragon = offset.dragoncharacter

    var ct, dpi, dpp, aid, ci, idx;
    if(log.src && log.src!=0) {
        var cb = log.src;
        ct =     cb.add(  o_cb.charactertype           ).readInt(); 
        ci =     cb.add(  o_cb.characterid             ).readInt(); 
        dpi =    cb.add(  o_cb.dungeonpartyindex       ).readInt(); 
        dpp =    cb.add(  o_cb.dungeonpartyposition    ).readInt(); 
        var p_mpid = cb.add(  o_cb.multiplayid             ).readPointer(); 

        var isd = ''+ci;
        if (ct==0 && isd[0] == '2'){  //dragon
            cb = cb.add( o_dragon.human).readPointer();
            ci = cb.add( o_cb.characterid).readInt();
            ci = ''+ci+'('+isd+')'
        }
        if (p_mpid != 0){
            aid = p_mpid.add( o_ci.actorid  ).readU8(); 
            idx = p_mpid.add( o_ci.index    ).readU8(); 
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
        ci = -1;
        idx = 0;
    }

    var from = csv(ci, '[', ct, dpi, dpp, aid, idx,']') ;

    cb = log.dst;
    ct =     cb.add(  o_cb.charactertype           ).readInt(); 
    ci =     cb.add(  o_cb.characterid             ).readInt(); 
    dpi =    cb.add(  o_cb.dungeonpartyindex       ).readInt(); 
    dpp =    cb.add(  o_cb.dungeonpartyposition    ).readInt(); 
    p_mpid = cb.add(  o_cb.multiplayid             ).readPointer(); 
    if (p_mpid != 0){
        aid = p_mpid.add( o_ci.actorid  ).readU8(); 
        idx = p_mpid.add( o_ci.index    ).readU8(); 
    }
    else{
        aid = -1;
        idx = -1;
    }
    var to = ci+':['+ ct+'|'+dpi+'.'+dpp+'.'+aid+'.'+idx +']' ;

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

    var skada = csv(ts, log.label, from, '->'+to, 
        '<'+log.aid+'>', '<'+log.sid+'>', dtype, log.dmg, '//', log.comment);
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
    var ab = ''
    switch(at){
        case 0: ab = 'null'; break;
        case 1: ab = 'poison'; break;
        case 2: ab = 'burn'; break;
        case 3: ab = 'freeze'; break;
        case 4: ab = 'paralysis'; break;
        case 5: ab = 'darkness'; break;
        case 6: ab = 'stun'; break;
        case 7: ab = 'curse'; break;
        case 8: ab = 'rebirth'; break;
        case 9: ab = 'bog'; break;
        case 10: ab = 'sleep'; break;
        case 11: ab = 'frostbite'; break;
        case 99: ab = 'all'; break;
        default: ab = 'null'; break;
    }
    return ab
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
        log.label = 'ct::add';
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
        log.label = 'cbtrb::eded'
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
        var optionsrc = args[4];
        var csstr_hitlabel = arrow(cha, o_cha.id);
        var hitlabel = csstr_hitlabel.add(0x14).readUtf16String();
        tmp.src = arrow(cha, o_cha.owner);  
        tmp.label = 'cb::apply';
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
        tmp.aid = args[4];
        tmp.sid = args[5];
        tmp.label = 'cb::aba';
        tmp.type = 'buff';
        tmp.ts = now();
        tmp.dmg = 0;
        tmp.comment = 'ac:' + conid;

        commit(tmp);
    }
});

