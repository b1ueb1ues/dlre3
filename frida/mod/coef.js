
gl.sp();
//gl.rangeint();
gl.rangefloat();
gl.invincible();
gl.dummy();

if (1)
hook( // CollisionHitAttribute$$get_DamageAdjustment
offset.collisionhitattribute.get_damageadjustment
,{ 
    onEnter: function(args){
        var tis = args[0];
        console.log('coef:', arrow.f(tis, 0xf8));
    },
    onLeave: function(ret){
        //var r = ptr(this.context.sp-0x100+0x70);
        //r.writeFloat(0.01);
    }
});

if (1)
hook( // CharacterBase::get_hpRate
offset.characterbase.get_hprate
,{
    onEnter: function(args){
    },
    onLeave: function(ret){
        var r = ptr(this.context.sp-0x100+0x70);
        //r.writeFloat(0.01); //3537
        //r.writeFloat(0.5); //6069
        //r.writeFloat(1); //6936
    }
});

