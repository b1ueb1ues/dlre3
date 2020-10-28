
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

function at2name(at){
    var ab = ''
    switch(at){
        case 0: ab = 'null'; break;
        case 1: ab = 'poison'; break;
        case 2: ab = 'burn'; break;
        case 3: ab = 'freeze'; break;
        case 4: ab = 'paralysis'; break;
        case 5: ab = 'blind'; break;
        case 6: ab = 'stun'; break;
        case 7: ab = 'curse'; break;
        case 8: ab = 'rebirth'; break;
        case 9: ab = 'bog'; break;
        case 10: ab = 'sleep'; break;
        case 11: ab = 'frostbite'; break;
        case 12: ab = 'flash'; break;
        case 13: ab = 'wind'; break;
        case 13: ab = 'darkabs'; break;
        case 99: ab = 'all'; break;
        default: ab = 'null'; break;
    }
    return ab
}


function afflic(ab, cha, ace) {
    var atype = ptr(ace).add(
        offset.actionconditionelement.atype
    ).readS32();

    var cb = arrow(ab, offset.abnormalstatusbase.owner);
    var cparam = arrow(cb, offset.characterbase.characterparameter);
    var paramtotal = arrow(cparam, offset.characterparameter.fptotal);
    var resists = arrow(paramtotal, offset.fluctuationparameter.abnormalresist);
    //showresist(resists);
    var resist = resists.add(0x20+atype*4).readFloat().toFixed(2);

    var rate = arrow.i(ace, offset.actionconditionelement.rate);

    var dst = cb;
    var src = arrow(cha, offset.collisionhitattribute.owner);
    print('atype:', at2name(atype));
    print('resist: ', resist);
    print('rate: ', rate);
    print('dst:' , dst);
    print('src:' , src);
    

}

hook(
offset.abnormalstatusbase.setup
,{
    onEnter: function(args){
        var tis = args[0];
        var cb = args[1];
        var cha = args[2];
        var ace = args[3];
        afflic(tis, cha, ace);
    }
});


hook(
offset.abnormalstatusenemybase.addition
,{
    onEnter: function(args){
        var tis = args[0];
        var cha = args[1];
        var ace = args[2];
        afflic(tis, cha, ace);
    }
});

