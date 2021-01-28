hook(
#InGameUICtrl$$ShowDamageUI#
,{
    onEnter: function (args) {
        this.context.sp.writeInt(0);
    }
});

var p_movein = lib_base.add(
#InGameUICtrl$$SetMoveIn#
);
var f_movein = new NativeFunction(p_movein, 'void', ['pointer', 'bool']);
function f_new_movein(tis, isin) {
    if (isin)
        f_movein(tis, 1);
}
var cb_movein = new NativeCallback(f_new_movein, 'void', ['pointer', 'bool']);
Interceptor.replace(p_movein, cb_movein);

hook(
#MainGameLeaveAloneChecker$$SetLeaveAloneTime#
,{
    onEnter: function(args){
        this.tis = args[0];
        console.error('- unsetleavealone');
    },
    onLeave: function(retval){
        var tis = this.tis;
        tis.add(@MainGameLeaveAloneChecker,_warnningTime@).writeFloat(100000);
        tis.add(@MainGameLeaveAloneChecker,_exitTime@).writeFloat(100000);
    }
});

var dodgeid = {'6':1, '7':1};
hook( 
#HumanCharacter$$GetAvoidActionId#
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
#CharacterBase$$CanCancelAction#
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
#PaymentTimer$$StartCounting#
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
