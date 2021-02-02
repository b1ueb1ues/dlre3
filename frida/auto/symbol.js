
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
