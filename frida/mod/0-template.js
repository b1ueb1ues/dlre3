
gl.sp();
//gl.rangeint();
//gl.rangefloat();
gl.invincible();
gl.dummy();

if (1)
hook( // CollisionHitAttribute$$get_DamageAdjustment
offset.collisionhitattribute.get_damageadjustment
,{ 
    onEnter: function(args){
        print('onEnter')
    },
    onLeave: function(ret){
    }
});

