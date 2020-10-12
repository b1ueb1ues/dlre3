
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


/**
 *  var table
 */

offset.characterbase.characterid = 0x12C;
offset.characterbase.dungeonpartyindex = 0x134;
offset.characterbase.dungeonpartyposition = 0x13C;
offset.characterbase.multiplayid = 0x140;
offset.characterbase.charactertype = 0x14C;
offset.characterbase.characterparameter = 0x158;
offset.characterbase.isdragon = 0x548;

offset.dragoncharacter.human = 0x758;

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


/**
 * functions table
 */

offset.datetime.get_utcnow = 0x31786A4;

offset.damagecalculation.calculation = 0x204425C;
offset.damagecalculation.calculationbasedamage = 0x2045458;

offset.characterbase.get_maxhp = 0x195D750;
offset.characterbase.get_attack = 0x195D8F8;
offset.characterbase.get_defense = 0x195D99C;
offset.characterbase.get_defcoef = 0x195DA0C;
offset.characterbase.get_hprate = 0x195D7E4;
offset.characterbase.recoverysp = 0x1984CBC;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x1962B00;
offset.characterbase.applydamage = 0x197B3EC;
offset.characterbase.applyslipdamage = 0x197C2A8;
offset.characterbase.calcabnormalstatusdamage = 0x197C0F8;

offset.characterbase.setabnormalstatus = 0x197FF10;
offset.characterbase.getmaxsp = 0x1982BC0;
offset.characterbase.showdamageui = 0x197832C;

offset.enemycharacter.ondamaged = 0x1A2B194;

offset.maingameleavealonechecker.setleavealonetime = 0x1B149A0;

offset.maingamectrl.playqueststart = 0x18CE9B4;
offset.maingamectrl.getgameplaytime = 0x18D0890;
offset.maingamectrl.get_instance = 0x18C1F14;

offset.actionconditionelement.get_rate = 0x25D69E8;

offset.random.rangefloat = 0x388AE7C;   // first range()
//offset.random.rangeint = 0x388AEEC;   // second range()
offset.random.randomrangeint = 0x388AEF0; 
offset.enemyctrl.setaiaction = 0x23CDE78;

offset.collisionhitattribute.get_damageadjustment = 0x207F02C;
offset.collisionhitattribute.get_tobk = 0x207F054;

offset.chainctrl.add = 0x1E6480C;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x1E903F0;

offset.ingameuictrl.showdamageui = 0x1993664;
offset.ingameuictrl.setmovein = 0x19A48A8;

offset.ctrloverdrive.ondamaged = 0x1BCC750;

offset.characterbuff.applycommon = 0x23FBF7C;
offset.characterbuff.apply = 0x23E900C;
offset.characterbuff.applybyability = 0x23FCC04;
offset.recoverstaminamethodselectpopup.isinshopmantenance = 0x1B55C08;


/**
 * dynamic
 */
offset.characterbase.ret = {};
offset.random.ret = {};

/**
 * return address
 */
offset.characterbase.ret.get_attack_2_dc_cbd = 0x02045e68;  // to calculationbasedamage
offset.random.ret.rangeint_2_dc_cbd = 0x02046130;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x020445b8;   // damagecalculation::calculation
offset.random.ret.rangeint_2_cb_ac = 0x023fc32c;  // characterbuff::applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0x14c;  //get from collisionHitAttribute::get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get  !!!!!
