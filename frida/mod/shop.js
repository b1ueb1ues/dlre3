
if(0)
hook(
0x02538240
,{
    onEnter: function(args){
        print('onEnter httphelper send');
    },
    onLeave: function(ret){
        print('onLeave httphelper send');
    }
});

if(0)
hook(
offset.recoverstaminamethodselectpopup.isinshopmantenance
,{
    onEnter: function(args){
        print('onEnter isinshopmantenace');
        //var bt = Thread.backtrace(this.context);
        //var caller = bt[0].toString();
        //console.log(caller);
    },
    onLeave: function(ret){
        print('onLeave isinshopmantenace');
        print(ret);
        ret.replace(1);
    }
});

if(0)
hook(
0x01b573a0 //__c__DisplayClass15_0::_CreateModule_b__1
,{
    onEnter: function(args){
        print('onEnter createmodule');
    },
    onLeave: function(ret){
        print('onLeave createmodule');
    }
});

if(0)
hook(
0x02992298 //PaymentTimer::Update
,{
    onEnter: function(args){
        print('onEnter timerupdate');
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
        print('onLeave timerupdate');
    }
});


if(0)
hook(
0x2988B9C
,{
    onEnter: function(args){
        print('onEnter getallitemlist');
        bt(this);
       // var dat_ = lib_base.add(0x073ca148);
       // console.log(hexdump(dat_.add(0xb8).readPointer().add(0x10).readPointer()));
    },
    onLeave: function(ret){
        print('onLeave getallitemlist');
       // var dat_ = lib_base.add(0x073ca148);
       // console.log(hexdump(dat_.add(0xb8).readPointer().add(0x10).readPointer()));
    }
});


if(1)
hook(
offset.paymenttimer.startcounting //PaymentTimer::StartCounting
,{
    onEnter: function(args){
        var t = ptr(this.context.sp-0x80-0x10);
        t.writeFloat(0.01);
    },
    onLeave: function(ret){
        var t = ptr(this.context.sp-0x80-0x10);
        t.writeFloat(0.01);
    }
});



if(1)
hook(
offset.platformutil.ismobile
,{
    onEnter: function(args){
    },
    onLeave: function(ret){
        ret.replace(0);
    }
});

if(1) {
    var p_shop = lib_base.add(
        //0x02988b9c //npf get all item list
        0x03f5cd04 // NativeBridgeImpl::VirtualCurrencyBundleGetAll
    );
    function f_new_shop() {
        print('replace');
    }
    var cb_shop = new NativeCallback(f_new_shop, 'void', []);
    Interceptor.replace(p_shop, cb_shop);
}

