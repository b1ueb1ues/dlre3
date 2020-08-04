// god like
//gl.dummy();
//gl.attack(10000);
//gl.invincible();
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

function at2name(at){
    var ab = ''
    if(at==0){
        ab = 'none'
    } else if(at==1){
        ab = 'poison'
    } else if(at==2){
        ab = 'burn'
    } else if(at==3){
        ab = 'freeze'
    } else if(at==4){
        ab = 'paralysis'
    } else if(at==5){
        ab = 'darkness'
    } else if(at==6){
        ab = 'swoon'
    } else if(at==7){
        ab = 'curse'
    } else if(at==8){
        ab = 'rebirth'
    } else if(at==9){
        ab = 'slowmove'
    } else if(at==10){
        ab = 'sleep'
    } else if(at==11){
        ab = 'frost'
    } else if(at==99){
        ab = 'all'
    }
    return ab
}


//send('self/team,[,ctype,::,cid,didx,dposition,multiplay_id,multiplay_index,],<actionid>,<skillid>,iscrit,dmg');
function recount(type, dot, dmg, iscrit, src, dst, actionid, skillid){
    var o_cb = offset.characterbase;
    var o_cha = offset.collisionhitattribute;
    var o_ci = offset.characterid;
    var o_dragon = offset.dragoncharacter
    var buff = 0;

    if(dot){
        skillid = at2name(actionid);
    }

    var cb = src;
    var ct =     cb.add(  o_cb.charactertype           ).readInt(); 
    var ci =     cb.add(  o_cb.characterid             ).readInt(); 
    var dpi =    cb.add(  o_cb.dungeonpartyindex       ).readInt(); 
    var dpp =    cb.add(  o_cb.dungeonpartyposition    ).readInt(); 
    var p_mpid = cb.add(  o_cb.multiplayid             ).readPointer(); 

    var isd = ''+ci;
    if (ct==0 && isd[0] == '2'){  //dragon
        cb = cb.add( o_dragon.human).readPointer();
        ci = cb.add( o_cb.characterid).readInt();
        ci = ''+ci+'('+isd+')'
    }
    
    if (p_mpid != 0){
        var aid = p_mpid.add( o_ci.actorid  ).readU8(); 
        var idx = p_mpid.add( o_ci.index    ).readU8(); 
    }
    else{
        var aid = -1;
        var idx = -1;
    }
    if (dot){
        ct = 0;
        dpp = 0;
        aid = -2;
        ci = -1;
    }
    var from = ci+' ,[,'+ ct+','+dpi+','+dpp+','+aid+','+idx   +',]' ;

    cb = dst;
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

    var skada = now()+','
    skada += type+','+ from +',';
    skada += '->'+to+','
    skada += '<'+actionid+'>,<'+skillid+'>,'
    if(iscrit){
        skada += 'crit_dmg'
    }else if(dot){
        skada += 'dot_dmg'
    }else{
        skada += 'dmg'
    }
    skada +=': ,' + dmg;
    send(skada);
}


hook(
offset.maingamectrl.playqueststart,
{
    onEnter: function(args){
        now_init();
        send(0, tone);
        var s = 'timestamp,self/other,cid,[,ctype,didx,dposition,multiplay_id,multiplay_index,],dst,<actionid>,<skillid>,iscrit,dmg'
        s += ',-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-'
        send(s, tzero);
        send('quest_start\n==============================', tstderr);
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


