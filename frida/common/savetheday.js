function savetheday () {
    // save the day
    hook(
    offset.ingameuictrl.showdamageui
    ,{
        onEnter: function (args) {
            //this.context.x3 = 0; //crit
            //this.context.x5 = 2;  //ele
            this.context.sp.writeInt(0); // isplayerctrl
        }
    });

    // save the day
    hook(
    offset.ingameuictrl.setmovein
    ,{
        onEnter: function (args) {
            if (args[1] == 0)
                this.context.x1 = 1;
        }
    });

    // save the day
    hook(offset.maingameleavealonechecker.setleavealonetime, {
        onEnter: function(args){
            this.tis = args[0];
            send('unsetleavealone',tstderr);
        },
        onLeave: function(retval){
            var tis = this.tis;
            tis.add(offset.maingameleavealonechecker.warnningtime).writeFloat(100000);
            tis.add(offset.maingameleavealonechecker.exittime).writeFloat(100000);
        }
    });

    // fuck the google
    hook( offset.paymenttimer.startcounting ,{
        onEnter: function(args){
            var t = ptr(this.context.sp-0x80-0x10);
            t.writeFloat(0.01);
        },
        onLeave: function(ret){
            var t = ptr(this.context.sp-0x80-0x10);
            t.writeFloat(0.01);
        }
    });

    // fuck the google
    hook( offset.platformutil.ismobile ,{
        onEnter: function(args){
        },
        onLeave: function(ret){
            ret.replace(0);
        }
    });

}
