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
    hook(
    offset.recoverstaminamethodselectpopup.isinshopmantenance
    ,{
        onEnter: function(args){
            //print('onEnter');
            //var bt = Thread.backtrace(this.context);
            //for (var i in bt) {
            //    console.log(bt[i]);
            //}
        },
        onLeave: function(ret){
            ret.replace(1);
            //send('fuck google', tstderr);
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
}
