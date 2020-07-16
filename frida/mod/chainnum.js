var ctx = {};

gl.invincible();
gl.dummy();

hook(
offset.chainctrl.add;
,{ // chain add
    onEnter: function(args){
        //console.log(args[2]);
        var tis = ptr(args[0]);
        var cn = tis.add(0x10).readInt();
        console.log(cn);
    },
    onLeave: function(ret){
    }
});

