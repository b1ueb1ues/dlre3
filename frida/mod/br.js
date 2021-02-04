hook( 
0x19A1FF4 //BattleRoyalFinalConfirmPopup::Create
,{ 
    onEnter: function(args){
        send('BattleRoyalFinalConfirmPopup::Create');
    },
    onLeave: function(ret){
        //f_decide1(ret);
    }
});

hook( 
0x18CEE88 // br_select_job_popup create
,{ 
    onEnter: function(args){
        send('BattleRoyalSelectJobPopup::Create');
    },
    onLeave: function(ret){
        //f_decide2(ret, 5, 1);
    }
});

hook( 
0x181448C
,{ 
    onEnter: function(args){
        send('MainGameCtrl::CreateContinueDialog')
    },
    onLeave: function(ret){
    }
});


