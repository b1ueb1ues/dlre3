
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

offset.characterbase.characterid = 0x134;
offset.characterbase.dungeonpartyindex = 0x13C;
offset.characterbase.dungeonpartyposition = 0x144;
offset.characterbase.multiplayid = 0x148;
offset.characterbase.charactertype = 0x154;
offset.characterbase.characterparameter = 0x160;
offset.characterbase.isdragon = 0x560;

offset.dragoncharacter.human = 0x760;

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

offset.datetime.get_utcnow = 0x2CCDBB8;

offset.damagecalculation.calculation = 0x1F7657C;
offset.damagecalculation.calculationbasedamage = 0x1F77770;

offset.characterbase.get_maxhp = 0x1794D74;
offset.characterbase.get_attack = 0x1794F1C;
offset.characterbase.get_defense = 0x1794FC0;
offset.characterbase.get_defcoef = 0x1795030;
offset.characterbase.get_hprate = 0x1794E08;
offset.characterbase.recoverysp = 0x17BCAA0;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x1799DA8;
offset.characterbase.applydamage = 0x17B2E1C;
offset.characterbase.applyslipdamage = 0x17B3D3C;
offset.characterbase.calcabnormalstatusdamage = 0x17B3B84;

offset.characterbase.setabnormalstatus = 0x17B79D4;
offset.characterbase.getmaxsp = 0x17BA8B4;
offset.characterbase.showdamageui = 0x17AFD94;

offset.enemycharacter.ondamaged = 0x18929D4;

offset.maingameleavealonechecker.setleavealonetime = 0x1A511C4;

offset.maingamectrl.playqueststart = 0x17E5DC8;
offset.maingamectrl.getgameplaytime = 0x17E7D50;
offset.maingamectrl.get_instance = 0x17D9244;

offset.actionconditionelement.get_rate = 0x24BD630;

offset.random.rangefloat = 0x354E838;   // first range()
//offset.random.rangeint = 0x354E8A8;   // second range()
offset.random.randomrangeint = 0x354E8AC; 
offset.enemyctrl.setaiaction = 0x254EB74;

offset.collisionhitattribute.get_damageadjustment = 0x1F22FF0;
offset.collisionhitattribute.get_tobk = 0x1F23018;

offset.chainctrl.add = 0x21A38E8;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x1C9E038;

offset.ingameuictrl.showdamageui = 0x184AD50;
offset.ingameuictrl.setmovein = 0x185C08C;
offset.ingameuictrl.showrecoverhp = 0x184B350;

offset.ctrloverdrive.ondamaged = 0x1C4CFFC;

offset.characterbuff.applycommon = 0x204D788;
offset.characterbuff.apply = 0x2039B88;
offset.characterbuff.applybyability = 0x204CD30;
offset.recoverstaminamethodselectpopup.isinshopmantenance = 0x1A9A92C;

offset.abnormalstatusbase.setup = 0x1DBB880;
offset.abnormalstatusbase.calcslipdamage = 0x1DBBD08;
offset.abnormalstatusenemybase.addition = 0x1DBEB04;
offset.paymenttimer.startcounting = 0x27AFFAC;
offset.platformutil.ismobile = 0x3AA25F8;


/**
 * dynamic
 */
offset.characterbase.ret = {};
offset.random.ret = {};

/**
 * return address
 */
offset.characterbase.ret.get_attack_2_dc_cbd = 0x01f7814c;  // to calculationbasedamage
offset.random.ret.rangeint_2_dc_cbd = 0x01f78428;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x01f768d4;   // damagecalculation::calculation
offset.random.ret.rangeint_2_cb_ac = 0x0204dbb4;  // characterbuff::applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0x15c;  //get from collisionHitAttribute::get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xac;  //get
offset.collisionhitattribute.charactertype = 0xa4;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xb0;  //get  !!!!!
