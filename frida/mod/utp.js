
gl.sp();
//gl.rangeint();
//gl.rangefloat();
gl.invincible();
gl.dummy();

if (1)
hook( // utpctrl add_point
0x194E260
,{ 
    onEnter: function(args){
        this.tis = args[0];
        this.p0 = arrow.f(args[0], 0x10);
    },
    onLeave: function(ret){
        this.p1 = arrow.f(this.tis, 0x10);
        print('utp+: ', this.p1-this.p0);
    }
});

