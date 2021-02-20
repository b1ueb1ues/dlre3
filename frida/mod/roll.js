
//gl.sp();
//gl.dummy();
//gl.theworld();
gl.dp();

function type(idx) {
    switch (idx) {
        case 0  : return 'none';
        case 1  : return 'poison';
        case 2  : return 'burn';
        case 3  : return 'freeze';
        case 4  : return 'paralys';
        case 5  : return 'blind';
        case 6  : return 'stun';
        case 7  : return 'curse';
        case 8  : return 'rebirth';
        case 9  : return 'bog';
        case 10 : return 'sleep';
        case 11 : return 'frostb';
        case 12 : return 'flashh';
        case 13 : return 'cwind';
        case 14 : return 'darka';
        case 15 : return 'dfire';
        case 99 : return 'all';
        default : return 'null';
    } 
}

//ActionConditionElement$$get_Rate
hook(offset.actionconditionelement.get_rate, {
    onEnter: function(args){
        this.type = ptr(args[0]).add(
            offset.actionconditionelement.atype
        ).readS32();
        this.typestr = type(this.type);
    },
    onLeave: function(ret){
        //console.log('procrate: '+r2i(ret));
        //console.log('proctype: '+this.typestr);
        if (this.typestr == 'bog')
            ret.replace(200);
    }
});

var ctx = {};
ctx.crit = 0;

hook(
offset.random.randomrangeint
,{  
    onEnter: function(args){
        this.spread = 0;
        var bt = Thread.backtrace(this.context)
        var dc_cbd = lib_base.add(
            offset.random.ret.rangeint_2_dc_cbd
        ).toString();
        if (bt[0].toString() == dc_cbd) {
            this.dccb = 1;
        }
    },
    onLeave: function(ret){
        if (this.dccb) {
            var o = ret;
            if (ctx.crit)
                ret.replace(1)
            console.log('rangeint:', o, '->', 1);
            ctx.crit = 0;
        }
    }
});

//DamageCalculation$$Calculation
hook(
offset.damagecalculation.calculation
,{
    onEnter: function(args){
        this.tis = args[0];
        this.attr = args[1];
        this.dst = args[2]

        var o_cha = offset.collisionhitattribute;

        var aid = ptr(this.attr).add(o_cha.actionid).readInt();
        print(aid);
        if (aid == 10138150)
            ctx.crit = 1;
    }
});

