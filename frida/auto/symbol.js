
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
offset.brfinalconfirmpopup = {};
offset.brselectjobpopup = {};


/**
 *  var table
 */

offset.characterbase.characterid = 0x144;
offset.characterbase.dungeonpartyindex = 0x14C;
offset.characterbase.dungeonpartyposition = 0x158;
offset.characterbase.multiplayid = 0x160;
offset.characterbase.charactertype = 0x16C;
offset.characterbase.characterparameter = 0x178;
offset.characterbase.isdragon = 0x5A8;

offset.dragoncharacter.human = 0x7B0;

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

offset.datetime.get_utcnow = 0x3664C3C;

offset.damagecalculation.calculation = 0x1F898FC;
offset.damagecalculation.calculationbasedamage = 0x1F8AC64;

offset.characterbase.get_maxhp = 0x18C0F88;
offset.characterbase.get_attack = 0x18C1130;
offset.characterbase.get_defense = 0x18C11D4;
offset.characterbase.get_defcoef = 0x18C1244;
offset.characterbase.get_hprate = 0x18C101C;
offset.characterbase.recoverysp = 0x18ED580;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x18C66B0;
offset.characterbase.applydamage = 0x18E2DA8;
offset.characterbase.applyslipdamage = 0x18E3D44;
offset.characterbase.calcabnormalstatusdamage = 0x18E3B84;

offset.characterbase.setabnormalstatus = 0x18E7DC8;
offset.characterbase.getmaxsp = 0x18EAF3C;
offset.characterbase.getsp = 0x18EAD5C;
offset.characterbase.showdamageui = 0x18DFCB4;

offset.characterbase.cancancelaction = 0x18CC5D0;
offset.humancharacter.getavoidactionid = 0x18155BC;

offset.enemycharacter.ondamaged = 0x19197AC;

offset.maingameleavealonechecker.setleavealonetime = 0x1AA8BB4;

offset.maingamectrl.playqueststart = 0x184FA50;
offset.maingamectrl.getgameplaytime = 0x1851A30;
offset.maingamectrl.get_instance = 0x1842574;
offset.maingamectrl.createcontinuedialog = 0x18507D4;

offset.actionconditionelement.get_rate = 0x2251198;

offset.random.rangefloat = 0x378EEDC;   // first range()
//offset.random.rangeint = 0x378EF4C;   // second range()
offset.random.randomrangeint = 0x378EF50; 
offset.enemyctrl.setaiaction = 0x256FCE4;

offset.collisionhitattribute.get_damageadjustment = 0x203C410;
offset.collisionhitattribute.get_tobk = 0x203C438;
offset.collisionhitattribute.get_additionrecoverydp = 0x203C460;

offset.chainctrl.add = 0x2028EFC;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x274A064;

offset.ingameuictrl.showdamageui = 0x19B5074;
offset.ingameuictrl.setmovein = 0x19C6EF4;
offset.ingameuictrl.showrecoverhp = 0x19B55B4;

offset.ctrloverdrive.ondamaged = 0x1CE01E4;

offset.characterbuff.applycommon = 0x1F5F254;
offset.characterbuff.apply = 0x1F4A208;
offset.characterbuff.applybyability = 0x1F5E7D4;
offset.recoverstaminamethodselectpopup.isinshopmantenance = 0x1BE8BBC;

offset.abnormalstatusbase.setup = 0x1C1EED0;
offset.abnormalstatusbase.calcslipdamage = 0x1C1F3C4;
offset.abnormalstatusenemybase.addition = 0x1C21EA4;
offset.paymenttimer.startcounting = 0x2A8C210;
offset.platformutil.ismobile = 0x3BAA888;

offset.utpctrl.addpoint = 0x1DE22D0;

offset.ingametime.getplaytime = 0x19ABA48;
offset.gamespeedtimespan.pause = 0x19ABF48;

offset.cameramodefollow.load = 0x201734C;

offset.brfinalconfirmpopup.create = 0x1A34DF8;
offset.brselectjobpopup.create = 0x19767B4;

/**
 * dynamic
 */
offset.characterbase.ret = {};
offset.random.ret = {};

/**
 * return address
 */
offset.characterbase.ret.get_attack_2_dc_cbd = 0x01f8b678;  // to calculationbasedamage
offset.random.ret.rangeint_2_dc_cbd = 0x01f8b9a4;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x01f89c54;   // damagecalculation::calculation
offset.random.ret.rangeint_2_cb_ac = 0x01f5f668;  // characterbuff::applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0x160;  //get from collisionHitAttribute::get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xac;  //get
offset.collisionhitattribute.charactertype = 0xa4;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xb0;  //get  !!!!!
