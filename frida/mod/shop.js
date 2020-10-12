
if(1){
hook(
offset.recoverstaminamethodselectpopup.isinshopmantenance
,{
        onEnter: function(args){
            //print('onEnter');
            //var bt = Thread.backtrace(this.context);
            //var caller = bt[0].toString();
            //console.log(caller);
        },
        onLeave: function(ret){
            ret.replace(1);
        }
    });
}


