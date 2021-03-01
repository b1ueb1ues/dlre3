hook( 
offset.brfinalconfirmpopup.create //BattleRoyalFinalConfirmPopup::Create
,{ 
    onEnter: function(args){
        send('BattleRoyalFinalConfirmPopup::Create');
    },
    onLeave: function(ret){
        //f_decide1(ret);
    }
});

hook( 
offset.brselectjobpopup.create // br_select_job_popup create
,{ 
    onEnter: function(args){
        send('BattleRoyalSelectJobPopup::Create');
    },
    onLeave: function(ret){
        //f_decide2(ret, 5, 1);
    }
});

hook( 
offset.maingamectrl.createcontinuedialog
,{ 
    onEnter: function(args){
        send('MainGameCtrl::CreateContinueDialog');
    },
    onLeave: function(ret){
    }
});


