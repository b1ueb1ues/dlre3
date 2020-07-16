var c = 1;

var ctx = {};

gl.sp();
gl.dummy();

function showresist(resists){
        var poi = resists.add(0x20+1*4).readFloat().toFixed(2);
        var bur = resists.add(0x20+2*4).readFloat().toFixed(2);
        var fre = resists.add(0x20+3*4).readFloat().toFixed(2);
        var par = resists.add(0x20+4*4).readFloat().toFixed(2);
        var dar = resists.add(0x20+5*4).readFloat().toFixed(2);
        var stu = resists.add(0x20+6*4).readFloat().toFixed(2);
        var cur = resists.add(0x20+7*4).readFloat().toFixed(2);
        var reb = 0;
        var bog = resists.add(0x20+9*4).readFloat().toFixed(2);
        var sle = resists.add(0x20+10*4).readFloat().toFixed(2);
        var fro = resists.add(0x20+11*4).readFloat().toFixed(2);
        console.log('poi: '+poi);
        console.log('bur: '+bur);
        console.log('fre: '+fre);
        console.log('par: '+par);
        console.log('dar: '+dar);
        console.log('stu: '+stu);
        console.log('cur: '+cur);
        console.log('bog: '+bog);
        console.log('sle: '+sle);
        console.log('fro: '+fro);
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
        this.type = ptr(args[0]).add(0x14).readS32();
        switch (this.type) {
            case 0:
                this.typestr = 'none';
                break;
            case 1:
                this.typestr = 'poison';
                break;
            case 2:
                this.typestr = 'burn';
                break;
            case 3:
                this.typestr = 'freeze';
                break;
            case 4:
                this.typestr = 'paralysis';
                break;
            case 5:
                this.typestr = 'darkness';
                break;
            case 6:
                this.typestr = 'stun';
                break;
            case 7:
                this.typestr = 'curse';
                break;
            case 8:
                this.typestr = 'rebirth';
                break;
            case 9:
                this.typestr = 'slowmove';
                break;
            case 10:
                this.typestr = 'sleep';
                break;
            case 11:
                this.typestr = 'frost';
                break;
            case 99:
                this.typestr = 'all';
                break;
            default:
                this.typestr = 'null';
        } 
    },
    onLeave: function(retval){
        console.log('procrate: '+r2i(retval));
        console.log('proctype: '+this.typestr);
    }
});

