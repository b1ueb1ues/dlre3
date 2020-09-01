
gl.sp();
//gl.rangeint(crit, proc);
//gl.rangefloat();
gl.invincible();
gl.dummy();

if (1)
hook( 
offset.chainctrl.add
,{ 
    onEnter: function(args){
        var tis = args[0];
        var pc = args[1];
        var aid = args[2];
        var sid = args[3];
        print(pc);
        print(aid.toInt32());
        print(sid.toInt32());
    },
    onLeave: function(ret){
    }
});

if (1)
hook( 
offset.characterbase.showdamageui
,{ 
    onEnter: function(args){
        var dmg = args[2];
        var crit = args[3];
        var atype = args[6];
        print('dmg: ', dmg.toInt32());
        print('crit: ', crit.toInt32());
        print('atype: ', atype.toInt32());
    },
    onLeave: function(ret){
    }
});


