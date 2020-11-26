
var offset = {};
offset.characterbase = {};
offset.dragoncharacter = {};
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


/**
 *  var table
 */

offset.characterbase.characterid = 0x12C;
offset.characterbase.dungeonpartyindex = 0x134;
offset.characterbase.dungeonpartyposition = 0x13C;
offset.characterbase.multiplayid = 0x140;
offset.characterbase.charactertype = 0x14C;
offset.characterbase.characterparameter = 0x158;
offset.characterbase.isdragon = 0x558;

offset.dragoncharacter.human = 0x778;

offset.characterparameter.fptotal = 0x98;

offset.fluctuationparameter.abnormalresist = 0x70;

offset.characterid.actorid = 0x10;
offset.characterid.index = 0x12;

offset.collisionhitattribute.actionhitexectype = 0x110;
offset.collisionhitattribute.id = 0x108;

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

offset.actioncontainer.actionid = 0x60;

offset.buffrecord.damage = 0x48;
offset.buffrecord.dst = 0x50;
offset.buffrecord.src = 0x58;

offset.actionconditionelement.atype = 0x14;
offset.actionconditionelement.rate = 0x70;

offset.abnormalstatusbase.owner = 0x18;


/**
 * functions table
 */

offset.datetime.get_utcnow = 0x2C58664;

offset.damagecalculation.calculation = 0x1F49AB8;
offset.damagecalculation.calculationbasedamage = 0x1F4ACAC;

offset.characterbase.get_maxhp = 0x17F504C;
offset.characterbase.get_attack = 0x17F51F4;
offset.characterbase.get_defense = 0x17F5298;
offset.characterbase.get_defcoef = 0x17F5308;
offset.characterbase.get_hprate = 0x17F50E0;
offset.characterbase.recoverysp = 0x181D240;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x17FA410;
offset.characterbase.applydamage = 0x1813604;
offset.characterbase.applyslipdamage = 0x1814524;
offset.characterbase.calcabnormalstatusdamage = 0x181436C;

offset.characterbase.setabnormalstatus = 0x181818C;
offset.characterbase.getmaxsp = 0x181B05C;
offset.characterbase.showdamageui = 0x18105DC;

offset.enemycharacter.ondamaged = 0x18C5258;

offset.maingameleavealonechecker.setleavealonetime = 0x19CFE48;

offset.maingamectrl.playqueststart = 0x1775FA8;
offset.maingamectrl.getgameplaytime = 0x1777F28;
offset.maingamectrl.get_instance = 0x1769508;

offset.actionconditionelement.get_rate = 0x248E840;

offset.random.rangefloat = 0x34EF4A0;   // first range()
//offset.random.rangeint = 0x34EF510;   // second range()
offset.random.randomrangeint = 0x34EF514; 
offset.enemyctrl.setaiaction = 0x253389C;

offset.collisionhitattribute.get_damageadjustment = 0x1EF3784;
offset.collisionhitattribute.get_tobk = 0x1EF37AC;

offset.chainctrl.add = 0x1E32728;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x1CB4BD8;

offset.ingameuictrl.showdamageui = 0x182BD54;
offset.ingameuictrl.setmovein = 0x183CFC8;

offset.ctrloverdrive.ondamaged = 0x1B546E0;

offset.characterbuff.applycommon = 0x211CCE4;
offset.characterbuff.apply = 0x2109698;
offset.characterbuff.applybyability = 0x211C28C;
offset.recoverstaminamethodselectpopup.isinshopmantenance = 0x1A4833C;

offset.abnormalstatusbase.setup = 0x1CFC3D8;
offset.abnormalstatusbase.calcslipdamage = 0x1CFC860;
offset.abnormalstatusenemybase.addition = 0x1CFF610;
offset.paymenttimer.startcounting = 0x2810540;
offset.platformutil.ismobile = 0x3B19480;


/**
 * dynamic
 */
offset.characterbase.ret = {};
offset.random.ret = {};

/**
 * return address
 */
offset.characterbase.ret.get_attack_2_dc_cbd = 0x01f4b688;  // to calculationbasedamage
offset.random.ret.rangeint_2_dc_cbd = 0x01f4b964;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x01f49e10;   // damagecalculation::calculation
offset.random.ret.rangeint_2_cb_ac = 0x0211d0fc;  // characterbuff::applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0x14c;  //get from collisionHitAttribute::get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get  !!!!!
