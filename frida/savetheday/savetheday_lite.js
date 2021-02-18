var __libname__ = "libil2cpp.so"
function print() { console.log.apply(null, arguments); }

var arrow = function(p, offset) { return p.add(offset).readPointer(); }
arrow.p = function(p, offset) { return p.add(offset).readPointer(); }
arrow.i = function(p, offset) { return p.add(offset).readInt(); }
arrow.f = function(p, offset) { return p.add(offset).readFloat(); }
arrow.d = function(p, offset) { return p.add(offset).readDouble(); }

var star = function(p) { return p.readPointer(); }
star.p = function(p) { return p.readPointer(); }
star.i = function(p) { return p.readInt(); }
star.f = function(p) { return p.readFloat(); }
star.p = function(p) { return p.readDouble(); }

var myp=0;
var mypp=0;
myp = Memory.alloc(4);
mypp = Memory.alloc(8);
function r2i(r){ return r.toInt32(); }
function r2f(r){ myp.writeInt(r.toInt32()); return myp.readFloat(); }
function r2d(r){ mypp.writeInt(r.toInt32()); return mypp.readDouble(); }

function dict(o) {
    var keys = Object.getOwnPropertyNames(o.__proto__);
    for (var i in keys) {
        try {
            console.log(keys[i], '\t', o[keys[i]]);
        } catch(e) {
            console.log(keys[i]);
}   }   }

function module(libname) { return new _module(libname); }
function _module(libname) {
    if (libname == undefined)
        this.lib_name = __libname__;
    else
        this.lib_name = libname;
    this.lib_base = Module.findBaseAddress(this.lib_name);
    console.error('[+] process_id: '+Process.id);
    console.error('[+] lib_base: '+this.lib_base);
    this.hook = function(address, hook) {
        Interceptor.attach(this.lib_base.add(address), hook);
    }
    this.bt = function(context){
        var b = Thread.backtrace(context);
        console.log('bt');
        for (var i in b) {
            console.log(ptr(b[i]).sub(this.lib_base));
}   }   }




var offset = {};
offset.characterbase = {};
offset.dragoncharacter = {};
offset.humancharacter = {};
offset.characterparameter = {};
offset.fluctuationparameter = {};
offset.characterid = {};
offset.collisionhitattribute = {};
offset.damagestatus = {};
offset.damagecalculation = {};
offset.attackhit = {};
offset.enemycharacter = {};
offset.maingameleavealonechecker = {};
offset.slipdamage = {};
offset.maingamectrl = {};
offset.abnormalstatusmultiplayservice = {};
offset.actionconditionelement = {};
offset.random = {};
offset.enemyctrl = {};
offset.chainctrl = {};
offset.characterdamageintermediate = {};
offset.datetime = {}
offset.characterbufftriggerreactionbomb = {};
offset.actioncontainer = {};
offset.buffrecord = {};
offset.ingameuictrl = {};
offset.ctrloverdrive = {};
offset.characterbuff = {};
offset.recoverstaminamethodselectpopup = {};
offset.abnormalstatusbase = {};
offset.abnormalstatusenemybase = {};
offset.paymenttimer = {};
offset.platformutil = {};
offset.utpctrl = {};
offset.ingametime = {};
offset.gamespeedtimespan = {};
offset.cameramodefollow = {};


/**
 *  var table
 */

offset.characterbase.characterid = 0x134;
offset.characterbase.dungeonpartyindex = 0x13C;
offset.characterbase.dungeonpartyposition = 0x144;
offset.characterbase.multiplayid = 0x148;
offset.characterbase.charactertype = 0x154;
offset.characterbase.characterparameter = 0x160;
offset.characterbase.isdragon = 0x560;

offset.dragoncharacter.human = 0x758;

offset.characterparameter.fptotal = 0x98;

offset.fluctuationparameter.abnormalresist = 0x70;

offset.characterid.actorid = 0x10;
offset.characterid.index = 0x12;

offset.collisionhitattribute.actionhitexectype = 0x120;
offset.collisionhitattribute.id = 0x118;

offset.damagestatus.value = 0x14;
offset.damagestatus.iscrit = 0x18;

offset.damagecalculation.normal = 0x10;

offset.attackhit.damage = 0x20;
offset.attackhit.iscrit = 0x48;

offset.maingameleavealonechecker.warnningtime = 0x28;
offset.maingameleavealonechecker.exittime = 0x2C;

offset.slipdamage.type = 0x20;
offset.slipdamage.damage = 0x24;
offset.slipdamage.attacker = 0x28;

offset.characterdamageintermediate.damage = 0x10;
offset.characterdamageintermediate.damageowner = 0x20;
offset.characterdamageintermediate.attackhit = 0x30;
offset.characterdamageintermediate.collisionhitattribute = 0x38;

offset.characterbufftriggerreactionbomb.container = 0x18;

offset.actioncontainer.actionid = 0x68;

offset.buffrecord.damage = 0x48;
offset.buffrecord.dst = 0x50;
offset.buffrecord.src = 0x58;

offset.actionconditionelement.atype = 0x14;
offset.actionconditionelement.rate = 0x70;

offset.abnormalstatusbase.owner = 0x18;

offset.cameramodefollow.min = 0x44;
offset.cameramodefollow.max = 0x48;

/**
 * functions table
 */

offset.datetime.get_utcnow = 0x2D7F25C;

offset.damagecalculation.calculation = 0x1EEEC6C;
offset.damagecalculation.calculationbasedamage = 0x1EEFF84;

offset.characterbase.get_maxhp = 0x179DB40;
offset.characterbase.get_attack = 0x179DCE8;
offset.characterbase.get_defense = 0x179DD8C;
offset.characterbase.get_defcoef = 0x179DDFC;
offset.characterbase.get_hprate = 0x179DBD4;
offset.characterbase.recoverysp = 0x17C6D94;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x17A2F38;
offset.characterbase.applydamage = 0x17BCE9C;
offset.characterbase.applyslipdamage = 0x17BDDBC;
offset.characterbase.calcabnormalstatusdamage = 0x17BDC04;

offset.characterbase.setabnormalstatus = 0x17C1A94;
offset.characterbase.getmaxsp = 0x17C4978;
offset.characterbase.getsp = 0x17C72C0;
offset.characterbase.showdamageui = 0x17B9F88;

offset.characterbase.cancancelaction = 0x17A8E4C;
offset.humancharacter.getavoidactionid = 0x17DBB38;

offset.enemycharacter.ondamaged = 0x18C365C;

offset.maingameleavealonechecker.setleavealonetime = 0x1A2E56C;

offset.maingamectrl.playqueststart = 0x1813760;
offset.maingamectrl.getgameplaytime = 0x18156E8;
offset.maingamectrl.get_instance = 0x1806444;

offset.actionconditionelement.get_rate = 0x261DBDC;

offset.random.rangefloat = 0x35EC05C;   // first range()
//offset.random.rangeint = 0x35EC0CC;   // second range()
offset.random.randomrangeint = 0x35EC0D0; 
offset.enemyctrl.setaiaction = 0x2478650;

offset.collisionhitattribute.get_damageadjustment = 0x1A7B554;
offset.collisionhitattribute.get_tobk = 0x1A7B57C;
offset.collisionhitattribute.get_additionrecoverydp = 0x1A7B5D4;

offset.chainctrl.add = 0x20BFFDC;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x26048C4;

offset.ingameuictrl.showdamageui = 0x18799D4;
offset.ingameuictrl.setmovein = 0x188B5EC;
offset.ingameuictrl.showrecoverhp = 0x1879FF0;

offset.ctrloverdrive.ondamaged = 0x1CC9A5C;

offset.characterbuff.applycommon = 0x1FDB6DC;
offset.characterbuff.apply = 0x1FC7A40;
offset.characterbuff.applybyability = 0x1FDAC88;
offset.recoverstaminamethodselectpopup.isinshopmantenance = 0x1B2AE1C;

offset.abnormalstatusbase.setup = 0x1DF9B60;
offset.abnormalstatusbase.calcslipdamage = 0x1DFA050;
offset.abnormalstatusenemybase.addition = 0x1DFCF30;
offset.paymenttimer.startcounting = 0x29BA5BC;
offset.platformutil.ismobile = 0x3B4D070;

offset.utpctrl.addpoint = 0x194E260;

offset.ingametime.getplaytime = 0x18706E4;
offset.gamespeedtimespan.pause = 0x1870BE4;

offset.cameramodefollow.load = 0x22EA94C;

/**
 * dynamic
 */
offset.characterbase.ret = {};
offset.random.ret = {};

/**
 * return address
 */
offset.characterbase.ret.get_attack_2_dc_cbd = 0x01ef0940;  // to calculationbasedamage
offset.random.ret.rangeint_2_dc_cbd = 0x01ef0c34;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x01eeefc4;   // damagecalculation::calculation
offset.random.ret.rangeint_2_cb_ac = 0x01fdbb08;  // characterbuff::applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0x15c;  //get from collisionHitAttribute::get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xac;  //get
offset.collisionhitattribute.charactertype = 0xa4;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xb0;  //get  !!!!!

var m = module(__libname__);
var hook = m.hook.bind(m);
var bt = m.bt.bind(m);
var lib_base = m.lib_base;

var g_gpt = new NativeFunction(m.lib_base.add(
    offset.maingamectrl.getgameplaytime
),'float', ['pointer']);
var g_mgc = new NativeFunction(m.lib_base.add(
    offset.maingamectrl.get_instance
),'pointer', []);
var mgc = null;
var now = function() {
    if (mgc)
        return g_gpt(mgc).toFixed(3);
    mgc = g_mgc(); 
    if (mgc)
        return g_gpt(mgc).toFixed(3);
    else
        return -1;
}

var pfn = m.lib_base.add(offset.datetime.get_utcnow);
now.utc = new NativeFunction(pfn, 'uint64', []);


function savetheday () {
    // save the day, little number
    hook(
    offset.ingameuictrl.showdamageui
    ,{
        onEnter: function (args) {
            this.context.sp.writeInt(0); // isplayerctrl
        }
    });

    // save the day, no ui hide
    var p_movein = lib_base.add(
        offset.ingameuictrl.setmovein
    );
    var f_movein = new NativeFunction(p_movein, 'void', ['pointer', 'bool']);
    function f_new_movein(tis, isin) {
        if (isin)
            f_movein(tis, 1);
    }
    var cb_movein = new NativeCallback(f_new_movein, 'void', ['pointer', 'bool']);
    Interceptor.replace(p_movein, cb_movein);

    // save the day, dodge cancel
    var dodgeid = {'6':1, '7':1};
    hook( 
    offset.humancharacter.getavoidactionid
    ,{ 
        onLeave: function(ret){
            var adid = ret.toInt32();
            if (adid != 6 && adid != 7 && !dodgeid[adid])
                dodgeid[adid] = 1;
        }
    });
    hook( 
    offset.characterbase.cancancelaction
    ,{ 
        onEnter: function(args){
            this.aid = args[1].toInt32();
        },
        onLeave: function(ret){
            if (dodgeid[this.aid])
                ret.replace(1);
        }
    });

    // save the day, no kick out
    hook(
    offset.maingameleavealonechecker.setleavealonetime
    ,{
        onEnter: function(args){
            this.tis = args[0];
            console.error('- unsetleavealone');
        },
        onLeave: function(retval){
            var tis = this.tis;
            tis.add(offset.maingameleavealonechecker.warnningtime).writeFloat(100000);
            tis.add(offset.maingameleavealonechecker.exittime).writeFloat(100000);
        }
    });

    // save the day, fuck google shop
    var fuck = 0;
    hook(
    offset.paymenttimer.startcounting
    ,{
        onEnter: function(args){
            console.error('- fxxkgoogle');
            var t = ptr(this.context.sp-0x90);
            t.writeFloat(0.01);
            fuck = 1;
        },
        onLeave: function(ret){
            var t = ptr(this.context.sp-0x90);
            t.writeFloat(0.01);
        }
    });

    // save the day, lock the camera distance
    hook( 
    offset.cameramodefollow.load
    ,{ 
        onEnter: function(args){
            var tis = ptr(args[0]);
            var max = arrow.f(tis, offset.cameramodefollow.max);
            tis.add(offset.cameramodefollow.min).writeFloat(max);
        }
    });
}

savetheday();