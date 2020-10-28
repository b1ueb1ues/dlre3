
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

offset.dragoncharacter.human = 0x770;

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

offset.datetime.get_utcnow = 0x31CE0BC;

offset.damagecalculation.calculation = 0x1FE44E4;
offset.damagecalculation.calculationbasedamage = 0x1FE56D8;

offset.characterbase.get_maxhp = 0x19666C4;
offset.characterbase.get_attack = 0x196686C;
offset.characterbase.get_defense = 0x1966910;
offset.characterbase.get_defcoef = 0x1966980;
offset.characterbase.get_hprate = 0x1966758;
offset.characterbase.recoverysp = 0x198E704;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x196BA98;
offset.characterbase.applydamage = 0x1984BD4;
offset.characterbase.applyslipdamage = 0x1985A9C;
offset.characterbase.calcabnormalstatusdamage = 0x19858E4;

offset.characterbase.setabnormalstatus = 0x1989704;
offset.characterbase.getmaxsp = 0x198C5D0;
offset.characterbase.showdamageui = 0x1981AEC;

offset.enemycharacter.ondamaged = 0x1A3342C;

offset.maingameleavealonechecker.setleavealonetime = 0x1B00B68;

offset.maingamectrl.playqueststart = 0x18D7490;
offset.maingamectrl.getgameplaytime = 0x18D9410;
offset.maingamectrl.get_instance = 0x18CA9F0;

offset.actionconditionelement.get_rate = 0x25CBA4C;

offset.random.rangefloat = 0x38AEB68;   // first range()
//offset.random.rangeint = 0x38AEBD8;   // second range()
offset.random.randomrangeint = 0x38AEBDC; 
offset.enemyctrl.setaiaction = 0x25DCD50;

offset.collisionhitattribute.get_damageadjustment = 0x20B16C4;
offset.collisionhitattribute.get_tobk = 0x20B16EC;

offset.chainctrl.add = 0x1F9BFE8;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x1E936C4;

offset.ingameuictrl.showdamageui = 0x199D1B4;
offset.ingameuictrl.setmovein = 0x19AE3C8;

offset.ctrloverdrive.ondamaged = 0x1C2FF8C;

offset.characterbuff.applycommon = 0x235CA14;
offset.characterbuff.apply = 0x23499A0;
offset.characterbuff.applybyability = 0x235D6B4;
offset.recoverstaminamethodselectpopup.isinshopmantenance = 0x1B5F960;

offset.abnormalstatusbase.setup = 0x1E39AD0;
offset.abnormalstatusbase.calcslipdamage = 0x1E39F58;
offset.abnormalstatusenemybase.addition = 0x1E3CAA0;


/**
 * dynamic
 */
offset.characterbase.ret = {};
offset.random.ret = {};

/**
 * return address
 */
offset.characterbase.ret.get_attack_2_dc_cbd = 0x01fe60b4;  // to calculationbasedamage
offset.random.ret.rangeint_2_dc_cbd = 0x01fe6390;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x01fe483c;   // damagecalculation::calculation
offset.random.ret.rangeint_2_cb_ac = 0x0235cdc4;  // characterbuff::applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0x14c;  //get from collisionHitAttribute::get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get  !!!!!
