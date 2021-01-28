hook(
0x18799D4
,{
    onEnter: function (args) {
        this.context.sp.writeInt(0);
    }
});

var p_movein = lib_base.add(
0x188B5EC
);
var f_movein = new NativeFunction(p_movein, 'void', ['pointer', 'bool']);
function f_new_movein(tis, isin) {
    if (isin)
        f_movein(tis, 1);
}
var cb_movein = new NativeCallback(f_new_movein, 'void', ['pointer', 'bool']);
Interceptor.replace(p_movein, cb_movein);

hook(
0x1A2E56C
,{
    onEnter: function(args){
        this.tis = args[0];
        console.error('- unsetleavealone');
    },
    onLeave: function(retval){
        var tis = this.tis;
        tis.add(0x28).writeFloat(100000);
        tis.add(0x2C).writeFloat(100000);
    }
});

var dodgeid = {'6':1, '7':1};
hook( 
0x17DBB38
,{ 
    onLeave: function(ret){
        var adid = ret.toInt32();
        if (adid == 6 || adid == 7)
            return;
        if (!dodgeid[adid])
            dodgeid[adid] = 1;
    }
});
hook( 
0x17A8E4C
,{ 
    onEnter: function(args){
        this.aid = args[1].toInt32();
    },
    onLeave: function(ret){
        if (dodgeid[this.aid])
            ret.replace(1);
    }
});

var fuck = 0;
hook(
0x29BA5BC
,{
    onEnter: function(args){
        console.error('- fxxkgoogle');
        var t = ptr(this.context.sp-0x80-0x10);
        t.writeFloat(0.01);
        fuck = 1;
    },
    onLeave: function(ret){
        var t = ptr(this.context.sp-0x80-0x10);
        t.writeFloat(0.01);
    }
});
