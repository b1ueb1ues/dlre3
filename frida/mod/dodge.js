//gl.rangeint(crit, proc);
//gl.rangefloat();
gl.invincible();
gl.dummy();
gl.sp();

var dodgeid = {};
hook( 
offset.humancharacter.getavoidactionid
,{ 
    onLeave: function(ret){
        var adid = ret.toInt32();
        if (!dodgeid[adid]) {
            dodgeid[adid] = 1;
        }
    }
});

hook( 
offset.characterbase.cancancelaction
,{ 
    onEnter: function(args){
        this.aid = args[1].toInt32();
    },
    onLeave: function(ret){
        //if (this.aid in [6,7,40])
        //    ret.replace(1);
        if (dodgeid[this.aid])
            ret.replace(1);
    }
});



//PlayerCtrl::IsInputAvoid
//CharacterBase::IsSupportCharacter
var iia = 0;
if (0)
hook( 
0x020632d4
,{ 
    onEnter: function(args){
    },
    onLeave: function(ret){
        if (ret.toInt32() != 0){
            //bt(this.context);
            //print('onLeave');
            //bt(this.context);
            iia = 1;
            print('is_input_avoid', ret);
        }
    }
});

if (0)
hook( 
0x0207177c
,{ 
    onEnter: function(args){
    },
    onLeave: function(ret){
        if (iia){
            iia = 0;
            ret.replace(1);
        }
        if (ret.toInt32() != 0){
            //print('onLeave');
            //bt(this.context);
            print('checkavoid', ret);
        }
    }
});

if (1)
hook( 
0x17B53E4
,{ 
    onEnter: function(args){
        print('cancelcharge', args[1]);
        bt(this.context);
    },
    onLeave: function(ret){
        print('cancelcharge end');
    }
});


