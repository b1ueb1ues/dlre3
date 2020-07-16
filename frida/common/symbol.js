/**
 *  var table
 */
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

offset.characterbase.characterid = 0x12C;
offset.characterbase.dungeonpartyindex = 0x134;
offset.characterbase.dungeonpartyposition = 0x13C;
offset.characterbase.multiplayid = 0x140;
offset.characterbase.charactertype = 0x14C;
offset.characterbase.characterparameter = 0x158;
offset.characterbase.isdragon = 0x508;

offset.dragoncharacter.human = 0x6C0;

offset.characterparameter.fptotal = 0x98;

offset.fluctuationparameter.abnormalresist = 0x70;

offset.characterid.actorid = 0x10;
offset.characterid.index = 0x12;

offset.collisionhitattribute.actionhitexectype = 0xC0;

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


/**
 * functions table
 */

offset.datetime.get_utcnow = 0x31A2BC8;

offset.damagecalculation.calculation = 0x1842754;
offset.damagecalculation.calculationbasedamage = 0x1843864;

offset.characterbase.get_maxhp = 0x18A82CC;
offset.characterbase.get_attack = 0x18A8474;
offset.characterbase.get_defense = 0x18A8508;
offset.characterbase.get_defcoef = 0x18A8578;
offset.characterbase.get_hprate = 0x18A8360;
offset.characterbase.recoverysp = 0x18CC7E8;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x18ACFA4;
offset.characterbase.applydamage = 0x18C3268;
offset.characterbase.applyslipdamage = 0x18C3FD8;
offset.characterbase.calcabnormalstatusdamage = 0x18C3DF0;

offset.characterbase.setabnormalstatus = 0x18C79F8;
offset.characterbase.getmaxsp = 0x18CA5D0;

offset.enemycharacter.ondamaged = 0x1824368;

offset.maingameleavealonechecker.setleavealonetime = 0x1958118;

offset.maingamectrl.playqueststart = 0x17D7770;
offset.maingamectrl.getgameplaytime = 0x17D9264;
offset.maingamectrl.get_instance = 0x17CB818;

offset.actionconditionelement.get_rate = 0x23FA338;

offset.random.rangefloat = 0x35B0828;   // first range()
//offset.random.rangeint = 0x35B0898;   // second range()
offset.random.randomrangeint = 0x35B089C; 
offset.enemyctrl.setaiaction = 0x22C3050;

offset.collisionhitattribute.get_damageadjustment = 0x1C17F80;
offset.collisionhitattribute.get_tobk = 0x1C17FA8;

offset.chainctrl.add = 0x1B7CCC0;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x21C5AD0;

offset.ingameuictrl.showdamageui = 0x17530CC;
offset.ingameuictrl.setmovein = 0x17630C4;

offset.ctrloverdrive.ondamaged = 0x18353F4;

offset.characterbuff.applycommon = 0x23C3C88;


/**
 * dynamic
 */
offset.characterbase.ret = {};
offset.random.ret = {};

/**
 * return address
 */
offset.characterbase.ret.get_attack_2_dc_cbd = 0x018442e0;  // to calculationbasedamage
offset.random.ret.rangeint_2_dc_cbd = 0x01844598;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x01842ab4;   // damagecalculation::calculation
offset.random.ret.rangeint_2_cb_ac = 0x023c4038;  // characterbuff::applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0xf8;  //get from collisionHitAttribute::get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get  !!!!!
