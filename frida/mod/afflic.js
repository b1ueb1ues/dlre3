var c = 1;

var ctx = {};

gl.sp();
gl.dummy();

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

function showresist(resists){
    var rs = [];
    for (var i=0; i<=15; i++) {
        let r = resists.add(0x20+i*4).readFloat().toFixed(2);
        rs.push(r)
        console.log(type(i)+'\t: '+r);
    }
}

//CharacterBase$$SetAbnormalStatus
hook(offset.characterbase.setabnormalstatus,{
    onEnter: function(args){
        var tis = args[0];
        var attr = args[1];
        var condi = args[2];
        var dmg = args[3];
        if (condi == 0)
            return;
        ctx.setabs = 1;
        //console.log(condi);
        //fun = tis.readPointer().add(0x3ac);
        //console.log(fun);
        //console.log(fun-ilbase);
        /*start set resist*/
        var cparam = arrow(tis,
            offset.characterbase.characterparameter
        );
        var paramtotal = arrow(cparam,
            offset.characterparameter.fptotal
        );
        var resists = arrow(paramtotal,
            offset.fluctuationparameter.abnormalresist
        );
        //console.log(resists.add(0x10).readByteArray(11*4));
        showresist(resists);
        // none poison burn freeze:3 para dark swoon curse:7 rebirth slowmove sleep:10 11
        //type = 9; 
        //resist = resists.add(0x10+type*4);
        //resist.writeFloat(0.3);
    },
    onLeave: function(retval){
        ctx.setabs = 0;
        console.log('');
        //console.log(this.context.s16)
    }
});

//ActionConditionElement$$get_Rate
hook(offset.actionconditionelement.get_rate, {
    onEnter: function(args){
        this.type = ptr(args[0]).add(
            offset.actionconditionelement.atype
        ).readS32();
        this.typestr = type(this.type);
    },
    onLeave: function(retval){
        console.log('procrate: '+r2i(retval));
        console.log('proctype: '+this.typestr);
    }
});

