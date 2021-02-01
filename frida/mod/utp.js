
gl.sp();
//gl.rangeint();
//gl.rangefloat();
gl.invincible();
gl.dummy();
gl.theworld();

if (1)
hook( // utpctrl addpoint
offset.utpctrl.addpoint
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

if (0)
hook( // 
offset.collisionhitattribute.get_additionrecoverydp
,{ 
    onEnter: function(args){
    },
    onLeave: function(ret){
        print('get_rdp');
        print(ret);
        ret.replace(1000);
    }
});
