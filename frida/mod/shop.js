
if(1)
hook(
offset.recoverstaminamethodselectpopup.isinshopmantenance
,{
    onEnter: function(args){
        //print('onEnter');
        //var bt = Thread.backtrace(this.context);
        //var caller = bt[0].toString();
        //console.log(caller);
    },
    onLeave: function(ret){
        ret.replace(1);
    }
});

if(0)
hook(
0x01b573a0
,{
    onEnter: function(args){
        print('onEnter');
        bt(this);
    },
    onLeave: function(ret){
        print('onLeave');
    }
});

if(0)
hook(
0x02992298
,{
    onEnter: function(args){
        print('onEnter payupdate');
        //var tis = args[0];
        //var isTimeout = arrow(tis, 0x20);
        //var startTime = arrow.f(tis, 0x1c);
        //var intervalTime = arrow.f(tis, 0x18);
        //tis.add(0x18).writeFloat(0.01);
        //print(startTime, intervalTime);
        //var p = args[1];
        //var a = arrow(p, 0x18);
        //var b = arrow(p, 0x1c);
        //var c = arrow(p, 0x20);
        //var t = ptr(this.context.sp-0x80-0x10);
        //console.log(hexdump(t));
        //print(a.readPointer(), b, c.readPointer(), args[0]);
    },
    onLeave: function(ret){
        print('onLeave');
    }
});


if(1)
hook(
0x2988B9C
,{
    onEnter: function(args){
        print('onEnter getallitemlist');
    },
    onLeave: function(ret){
        print('onLeave getallitemlist');
    }
});


if(1)
hook(
0x2988CE0
,{
    onEnter: function(args){
        print('onEnter');
        bt(this);
        var t = ptr(this.context.sp-0x80-0x10);
        var timeout = t.readFloat();
        print(timeout);
        //t.writeFloat(0.01);
    },
    onLeave: function(ret){
        print('onLeave');
    }
});
