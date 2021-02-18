
//gl.sp();
////gl.rangeint(crit, proc);
////gl.rangefloat();
//gl.dummy();
gl.invincible();
gl.theworld();

if (1)
hook( 
offset.cameramodefollow.load// #CameraModeFollow$$LoadFollowDistance#;
,{ 
    onEnter: function(args){
        print('onEnter');
        var tis = ptr(args[0]);
        var max = arrow.f(tis, offset.cameramodefollow.max);
        print(arrow.f(tis, offset.cameramodefollow.min));
        print(max);
        tis.add(offset.cameramodefollow.min).writeFloat(max);
    }
});

