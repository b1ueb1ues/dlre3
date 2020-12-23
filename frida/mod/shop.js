
if(1)
hook(
offset.paymenttimer.startcounting //PaymentTimer::StartCounting
,{
    onEnter: function(args){
        console.log('fxxk google');
        var t = ptr(this.context.sp-0x80-0x10);
        t.writeFloat(0.01);
    },
    onLeave: function(ret){
        var t = ptr(this.context.sp-0x80-0x10);
        t.writeFloat(0.01);
    }
});


if(0)
hook(
offset.platformutil.ismobile
,{
    onEnter: function(args){
    },
    onLeave: function(ret){
        ret.replace(0);
    }
});

//if(1) {
//    var p_shop = lib_base.add(
//        //0x02988b9c //npf get all item list
//        0x03f5cd04 // NativeBridgeImpl::VirtualCurrencyBundleGetAll
//    );
//    function f_new_shop() {
//        print('replace');
//    }
//    var cb_shop = new NativeCallback(f_new_shop, 'void', []);
//    Interceptor.replace(p_shop, cb_shop);
//}

