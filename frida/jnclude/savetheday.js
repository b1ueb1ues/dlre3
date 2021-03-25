function savetheday () {
    // save the day, little number
    hook(
    offset.ingameuictrl.showdamageui
    ,{
        onEnter: function (args) {
            this.context.sp.writeInt(0); // isplayerctrl
        }
    });


    // save the day, no ui hide. v1
    hook(
    offset.ingameuictrl.setmovein
    ,{
        onEnter: function (args) {
            if (args[1] == 0)
                this.context.x1 = 1;
        }
    });


    // save the day, no ui hide. v2
    //var p_movein = lib_base.add(
    //    offset.ingameuictrl.setmovein
    //);
    //var f_movein = new NativeFunction(p_movein, 'void', ['pointer', 'bool']);
    //function f_new_movein(tis, isin) {
    //    if (isin)
    //        f_movein(tis, 1);
    //}
    //var cb_movein = new NativeCallback(f_new_movein, 'void', ['pointer', 'bool']);
    //Interceptor.replace(p_movein, cb_movein);

    // save the day, dodge cancel
    var dodgeid = {'6':1, '7':1};
    hook( 
    offset.humancharacter.getavoidactionid
    ,{ 
        onLeave: function(ret){
            var adid = ret.toInt32();
            if (adid != 6 && adid != 7 && !dodgeid[adid])
                dodgeid[adid] = 1;
        }
    });
    hook( 
    offset.characterbase.cancancelaction
    ,{ 
        onEnter: function(args){
            this.aid = args[1].toInt32();
        },
        onLeave: function(ret){
            if (dodgeid[this.aid])
                ret.replace(1);
        }
    });

    // save the day, no kick out
    hook(
    offset.maingameleavealonechecker.setleavealonetime
    ,{
        onEnter: function(args){
            this.tis = args[0];
            console.error('- unsetleavealone');
        },
        onLeave: function(retval){
            var tis = this.tis;
            tis.add(offset.maingameleavealonechecker.warnningtime).writeFloat(100000);
            tis.add(offset.maingameleavealonechecker.exittime).writeFloat(100000);
        }
    });

    // save the day, fuck google shop
    var fuck = 0;
    hook(
    offset.paymenttimer.startcounting
    ,{
        onEnter: function(args){
            console.error('- fxxkgoogle');
            var t = ptr(this.context.sp-0x90);
            t.writeFloat(0.01);
            fuck = 1;
        },
        onLeave: function(ret){
            var t = ptr(this.context.sp-0x90);
            t.writeFloat(0.01);
        }
    });

    // save the day, lock the camera distance
    hook( 
    offset.cameramodefollow.load
    ,{ 
        onEnter: function(args){
            var tis = ptr(args[0]);
            var max = arrow.f(tis, offset.cameramodefollow.max);
            tis.add(offset.cameramodefollow.min).writeFloat(max);
        }
    });
}
