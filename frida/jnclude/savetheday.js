function savetheday () {
    // save the day, little number
    hook(
    offset.ingameuictrl.showdamageui
    ,{
        onEnter: function (args) {
            this.context.sp.writeInt(0); // isplayerctrl
        }
    });

    // save the day, no ui hide
    hook(
    offset.ingameuictrl.setmovein
    ,{
        onEnter: function (args) {
            if (args[1] == 0)
                this.context.x1 = 1;
        }
    });

    // save the day, dodge cancel
    var dodgeid = {'6':1, '7':1};
    hook( 
    offset.humancharacter.getavoidactionid
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
            var t = ptr(this.context.sp-0x80-0x10);
            t.writeFloat(0.01);
            fuck = 1;
        },
        onLeave: function(ret){
            var t = ptr(this.context.sp-0x80-0x10);
            t.writeFloat(0.01);
        }
    });
}
