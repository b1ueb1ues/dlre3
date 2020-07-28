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
offset.characterbase.isdragon = 0x530;

offset.dragoncharacter.human = 0x708;

offset.characterparameter.fptotal = 0x98;

offset.fluctuationparameter.abnormalresist = 0x70;

offset.characterid.actorid = 0x10;
offset.characterid.index = 0x12;

offset.collisionhitattribute.actionhitexectype = 0xE8;

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

offset.datetime.get_utcnow = 0x31C8C24;

offset.damagecalculation.calculation = 0x18BDED8;
offset.damagecalculation.calculationbasedamage = 0x18BEFE8;

offset.characterbase.get_maxhp = 0x18082B8;
offset.characterbase.get_attack = 0x1808460;
offset.characterbase.get_defense = 0x1808504;
offset.characterbase.get_defcoef = 0x1808574;
offset.characterbase.get_hprate = 0x180834C;
offset.characterbase.recoverysp = 0x182CDB0;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x180CFF8;
offset.characterbase.applydamage = 0x1823974;
offset.characterbase.applyslipdamage = 0x182477C;
offset.characterbase.calcabnormalstatusdamage = 0x1824594;

offset.characterbase.setabnormalstatus = 0x1828208;
offset.characterbase.getmaxsp = 0x182AD14;

offset.enemycharacter.ondamaged = 0x189F7F8;

offset.maingameleavealonechecker.setleavealonetime = 0x19A8894;

offset.maingamectrl.playqueststart = 0x17F53B8;
offset.maingamectrl.getgameplaytime = 0x17F6EB4;
offset.maingamectrl.get_instance = 0x17E941C;

offset.actionconditionelement.get_rate = 0x23C317C;

offset.random.rangefloat = 0x35F23B4;   // first range()
//offset.random.rangeint = 0x35F2424;   // second range()
offset.random.randomrangeint = 0x35F2428; 
offset.enemyctrl.setaiaction = 0x225056C;

offset.collisionhitattribute.get_damageadjustment = 0x1A31B5C;
offset.collisionhitattribute.get_tobk = 0x1A31B84;

offset.chainctrl.add = 0x238C600;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x211D9B8;

offset.ingameuictrl.showdamageui = 0x176FDBC;
offset.ingameuictrl.setmovein = 0x177FE50;

offset.ctrloverdrive.ondamaged = 0x18B0B78;

offset.characterbuff.applycommon = 0x22EE620;


/**
 * dynamic
 */
offset.characterbase.ret = {};
offset.random.ret = {};

/**
 * return address
 */
offset.characterbase.ret.get_attack_2_dc_cbd = 0x018bfa68;  // to calculationbasedamage
offset.random.ret.rangeint_2_dc_cbd = 0x018bfd20;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x018be238;   // damagecalculation::calculation
offset.random.ret.rangeint_2_cb_ac = 0x022ee9d0;  // characterbuff::applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0x120;  //get from collisionHitAttribute::get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get  !!!!!
