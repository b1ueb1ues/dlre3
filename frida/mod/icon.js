var ctx = {};



//hook(0x8d5448,{  // GameParam$$get_DamageAdjustCoef  /0.6
//    onEnter: function(args){
//    },
//    onLeave: function(retval){
//            console.log('damageadjustcoef:'+retval);
//    }
//});



hook(0x1386674,{  
    onEnter: function(args){
        //console.log(args[1])
        console.log(this.context.x1);
        this.context.x1 = 21;
    },
    onLeave: function(ret){
    }
});

