
if(0) {
    var p_shop = lib_base.add(
        //0x01b1a8d0 // RecoverStaminaMethodSelectPopup::Start
        //0x01b1a56c // RecoverStaminaMethodSelectPopup::CreateModule
         0x184DF70 //show get list
    );
    function f_new_shop() {
        print('replace');
    }
    var cb_shop = new NativeCallback(f_new_shop, 'void', []);
    Interceptor.replace(p_shop, cb_shop);
}

if(1){
    hook(
    //0x01b1b838, // _createmodule_b__0
    //0x01b1a8d0, // RecoverStaminaMethodSelectPopup::Start
    //0x01b1a56c, // RecoverStaminaMethodSelectPopup::CreateModule
    //0x023c2ee8, // http::send
    //0x1882B88, // shop get list
0x03d094cc,
    {
        onEnter: function(args){
            print('onEnter');
            this.tis = args[0];
        },
        onLeave: function(ret){
            var b = this.tis.add(0x18);
            print(hexdump(b));
            print(hexdump(b.readPointer()));
            print(hexdump(b.readPointer().add(0x10).readPointer()));

        }
    });
}


