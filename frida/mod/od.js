var ctx = {};

//gl.sp();
//gl.rangeint();
gl.rangefloat();
gl.invincible();
gl.dummy();

if (1)
hook( // CollisionHitAttribute$$get_ToBreakDmgRate
offset.collisionhitattribute.get_tobk
,{  
    onEnter: function(args){
    },
    onLeave: function(retval){
            console.log('toOdRate: '+p2f(retval));
    }
});


if (1)
hook( // CtrlOverdrive::OnDamaged
offset.ctrloverdrive.ondamaged
,{  
    onEnter: function(args){
        this.odhp = ptr(args[0]).add(0x2c)
        console.log('ctrlOD_in: '+this.odhp.readFloat());
    },
    onLeave: function(ret){
        if (this.context.x19 != 0){
            console.log('ctrlOD_out: '+this.odhp.readFloat());
        }
    }
});
