var ctx = {};

gl.invincible();
gl.dummy();

hook(
offset.chainctrl.add
,{ // chain add
    onEnter: function(args){
        //console.log(args[2]);
        var tis = ptr(args[0]);
        //var timer = tis.add(0x10).readFloat();
        //console.log(timer);
        //var vt = tis.add(0x14).readFloat();
        //console.log(vt);

        var cnd = tis.add(0x18).readPointer();
        console.log(hexdump(arrow(cnd, 0)));
        console.log(arrow.i(cnd, 0));

    },
    onLeave: function(ret){
    }
});


