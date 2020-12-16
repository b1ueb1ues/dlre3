// god like
//gl.dummy();
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
    send({hook:'init', t0:0})
else
    send({hook:'init', t0:now()})


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
        idx = 0;
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

function recount(label, dot, dmg, iscrit, src, dst, aid, sid){
    var from = parse_cb(src);
    var to = parse_cb(dst);

    if(dot) {
        sid = at2name(aid);
    }

    var dtype;
    if(iscrit){
        dtype = 'crit_dmg'
    }else if(dot){
        dtype = 'dot_dmg'
    }else{
        dtype = 'dmg'
    }

    var skada = {
        ts      : now(),
        hook    : label,
        from    : from,
        to      : to,
        aid     : aid,
        sid     : sid,
        dtype   : dtype,
        dmg     : dmg,
        comment : ' '
    }
    send(skada);
}


hook(
offset.maingamectrl.playqueststart,
{
    onEnter: function(args){
        now_init();
        send({hook:'start', t0:0})
        console.error('- quest_start\n==============================');
    },
    onLeave: function(retval){
    }
});


hook(
offset.characterbase.calcabnormalstatusdamage,
{
    onEnter: function(args){
        var dst = args[0];
        //var src = args[1]; //attacker can be multiplayer
        var dmg = args[2];
        var abt = args[4];

        var at = abt.toInt32();
        var damage = dmg.toInt32();

        recount('cb::casd',1, damage, 0, dst, dst, abt, 0); 
    }
});


//CharacterBase$$ApplyDamage
hook(offset.characterbase.applydamage, {
    onEnter: function(args){
        //console.log('cb::ad');
        var o_ah = offset.attackhit;
        var o_cdi = offset.characterdamageintermediate;
        var o_cha = offset.collisionhitattribute;

        var tis = args[0];
        var cdi = args[1];
        var attackhit = cdi.add( o_cdi.attackhit ).readPointer();
        // console.log('ah: '+attackhit);
        // console.log(hexdump(attackhit,20));

        var cha = cdi.add( o_cdi.collisionhitattribute ).readPointer(); // collisionhitattribute
        //src = cdi.add(o_cdi.damageowner); //characterbase from

        //damage = attackhit.add(  o_ah.damage  ).readInt();
        var damage = cdi.add(  o_cdi.damage ).readInt();
        var iscrit = attackhit.add(  o_ah.iscrit  ).readU8();
        var actionid = cha.add( o_cha.actionid  ).readInt();
        var skillid =  cha.add( o_cha.skillid   ).readInt();
        var src = arrow(cha,  o_cha.owner );  
        recount('cb::admg', 0, damage,iscrit,src,tis, actionid, skillid);
    },
    onLeave: function(retval){
    }
});


hook(
offset.characterbufftriggerreactionbomb.execdebuffextradamage
,{
    onEnter: function(args) {
        var tis = args[0];
        var p_br = args[1];
        var damage = p_br.add(
            offset.buffrecord.damage
        ).readS32();
        var dst = p_br.add(
            offset.buffrecord.dst
        ).readPointer();
        var src = p_br.add(
            offset.buffrecord.src
        ).readPointer();

        var actioncontainer = tis.add(
            offset.characterbufftriggerreactionbomb.container
        ).readPointer();
        var actionid = actioncontainer.add(
            offset.actioncontainer.actionid
        ).readS32();
        
        recount('cbtrb::eded', 0, damage, 0, src, dst, actionid, 0);
    },
    onLeave: function(ret){
    }
});



////DamageCalculation$$Calculation
//hook(offset.damagecalculation.calculation, {
//    onEnter: function(args){
//        //console.log('calc start');
//        this.tis = args[0];
//        this.attr = args[1];
//        this.dst = args[2]
//    },
//    onLeave: function(retval){
//        //console.log('calc end');
//
//        o_ds = offset.damagestatus;
//        o_dc = offset.damagecalculation;
//        o_cha = offset.collisionhitattribute;
//
//        p_ds = arrow(this.tis, o_dc.normal); //damagestatues normal
//
//        dmg = p_ds.add(o_ds.value);
//
//        //cb = arrow(this.attr,0x24); //characterbase owner
//        //ct = cb.add(0xb8).readInt(); //charactertype
//        ct = this.attr.add(o_cha.charactertype).readInt();
//
//        damage = dmg.readInt() ; //value
//        iscrit = p_ds.add(o_ds.iscrit).readU8()
//        cha = this.attr // collisionhitattribute
//        if(ct==0){
//            recount('dc::calc',damage,iscrit,cha,0,this.dst);
//        }
//
//        // cheat
//        if(gl){
//            if(ct==0){
//                newdmg = gl;
//                //console.log('replaceatt '+dmg.readInt()+'->'+newdmg);
//                dmg.writeInt(newdmg);
//            }else{
//                //console.log('replacedt '+dmg.readInt()+'->0');
//                dmg.writeInt(0);
//            }
//        }
//    }
//});
//
//
////EnemyCharacter$$OnDamaged
//hook(offset.enemycharacter.ondamaged, {
//    onEnter: function(args){
//        o_ah = offset.attackhit;
//        tis = args[0];
//        attackhit = args[1];
//        //cb = args[3]; //characterbase from
//
//        damage = attackhit.add(  o_ah.damage  ).readInt();
//        iscrit = attackhit.add(  o_ah.iscrit  ).readU8();
//        cha = args[2]; // collisionhitattribute
//        recount('ec::ondt',damage,iscrit,cha,0,tis);
//    },
//    onLeave: function(retval){
//    }
//});


