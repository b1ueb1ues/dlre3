hook(
#InGameUICtrl$$ShowDamageUI#
,{
    onEnter: function (args) {
        this.context.sp.writeInt(0);
    }
});

hook(
#InGameUICtrl$$SetMoveIn#
,{
    onEnter: function (args) {
        if (args[1] == 0)
            this.context.x1 = 1;
    }
});

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

var dodgeid = {};
hook( 
#HumanCharacter$$GetAvoidActionId#
,{ 
    onLeave: function(ret){
        var adid = ret.toInt32();
        if (!dodgeid[adid]) {
            dodgeid[adid] = 1;
        }
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
