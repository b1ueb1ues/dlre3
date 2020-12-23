function savetheday () {
    // save the day
    hook(
    #InGameUICtrl$$ShowDamageUI# // offset.ingameuictrl.showdamageui
    ,{
        onEnter: function (args) {
            //this.context.x3 = 0; //crit
            //this.context.x5 = 2;  //ele
            this.context.sp.writeInt(0); // isplayerctrl
        }
    });

    // save the day
    hook(
    #InGameUICtrl$$SetMoveIn# // offset.ingameuictrl.setmovein
    ,{
        onEnter: function (args) {
            if (args[1] == 0)
                this.context.x1 = 1;
        }
    });

    // save the day
    hook(
    #MainGameLeaveAloneChecker$$SetLeaveAloneTime# // offset.maingameleavealonechecker.setleavealonetime
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

    // fuck google
    var fuck = 0;
    hook(
    #PaymentTimer$$StartCounting# // offset.paymenttimer.startcounting
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

    // fuck google
    hook(
    #PlatformUtil$$IsMobile# // offset.platformutil.ismobile
    ,{
        onEnter: function(args){
        },
        onLeave: function(ret){
            if(fuck) {
                console.error('- fxxkgoogle');
                ret.replace(0);
                fuck = 0;
            }
        }
    });
}
savetheday();
