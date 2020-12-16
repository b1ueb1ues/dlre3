function savetheday () {
    // save the day
    hook(
    0x1993664 // offset.ingameuictrl.showdamageui
    ,{
        onEnter: function (args) {
            //this.context.x3 = 0; //crit
            //this.context.x5 = 2;  //ele
            this.context.sp.writeInt(0); // isplayerctrl
        }
    });

    // save the day
    hook(
    0x19A48A8 // offset.ingameuictrl.setmovein
    ,{
        onEnter: function (args) {
            if (args[1] == 0)
                this.context.x1 = 1;
        }
    });

    // save the day
    hook(
    0x1B149A0 // offset.maingameleavealonechecker.setleavealonetime
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

    // fuck google
    var fuck = 0;
    hook(
    0x2988CE0 // offset.paymenttimer.startcounting
    ,{
        onEnter: function(args){
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
    0x3F3DE30 // offset.platformutil.ismobile
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
