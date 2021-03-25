
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

offset.datetime.get_utcnow = 0x36694EC;

offset.damagecalculation.calculation = 0x1F8A8CC;
offset.damagecalculation.calculationbasedamage = 0x1F8BC34;

offset.characterbase.get_maxhp = 0x18C1F58;
offset.characterbase.get_attack = 0x18C2100;
offset.characterbase.get_defense = 0x18C21A4;
offset.characterbase.get_defcoef = 0x18C2214;
offset.characterbase.get_hprate = 0x18C1FEC;
offset.characterbase.recoverysp = 0x18EE550;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x18C7680;
offset.characterbase.applydamage = 0x18E3D78;
offset.characterbase.applyslipdamage = 0x18E4D14;
offset.characterbase.calcabnormalstatusdamage = 0x18E4B54;

offset.characterbase.setabnormalstatus = 0x18E8D98;
offset.characterbase.getmaxsp = 0x18EBF0C;
offset.characterbase.getsp = 0x18EBD2C;
offset.characterbase.showdamageui = 0x18E0C84;

offset.characterbase.cancancelaction = 0x18CD5A0;
offset.humancharacter.getavoidactionid = 0x181758C;

offset.enemycharacter.ondamaged = 0x191A77C;

offset.maingameleavealonechecker.setleavealonetime = 0x1AA9B84;

offset.maingamectrl.playqueststart = 0x1851A20;
offset.maingamectrl.getgameplaytime = 0x1853A00;
offset.maingamectrl.get_instance = 0x1844544;
offset.maingamectrl.createcontinuedialog = 0x18527A4;

offset.actionconditionelement.get_rate = 0x2251154;

offset.random.rangefloat = 0x379478C;   // first range()
//offset.random.rangeint = 0x37947FC;   // second range()
offset.random.randomrangeint = 0x3794800; 
offset.enemyctrl.setaiaction = 0x2571A80;

offset.collisionhitattribute.get_damageadjustment = 0x203C3E0;
offset.collisionhitattribute.get_tobk = 0x203C408;
offset.collisionhitattribute.get_additionrecoverydp = 0x203C430;

offset.chainctrl.add = 0x2028ECC;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x274D914;

offset.ingameuictrl.showdamageui = 0x19B6044;
offset.ingameuictrl.setmovein = 0x19C7EC4;
offset.ingameuictrl.showrecoverhp = 0x19B6584;

offset.ctrloverdrive.ondamaged = 0x1CE21B4;

offset.characterbuff.applycommon = 0x1F5F224;
offset.characterbuff.apply = 0x1F4A1D8;
offset.characterbuff.applybyability = 0x1F5E7A4;
offset.recoverstaminamethodselectpopup.isinshopmantenance = 0x1BE9B8C;

offset.abnormalstatusbase.setup = 0x1C1FEA0;
offset.abnormalstatusbase.calcslipdamage = 0x1C20394;
offset.abnormalstatusenemybase.addition = 0x1C22E74;
offset.paymenttimer.startcounting = 0x2A8FAC0;
offset.platformutil.ismobile = 0x3BAD138;

offset.utpctrl.addpoint = 0x1DE42A0;

offset.ingametime.getplaytime = 0x19ACA18;
offset.gamespeedtimespan.pause = 0x19ACF18;

offset.cameramodefollow.load = 0x201731C;

offset.brfinalconfirmpopup.create = 0x1A35DC8;
offset.brselectjobpopup.create = 0x1977784;

/**
 * dynamic
 */
offset.characterbase.ret = {};
offset.random.ret = {};

/**
 * return address
 */
offset.characterbase.ret.get_attack_2_dc_cbd = 0x01f8c648;  // to calculationbasedamage
offset.random.ret.rangeint_2_dc_cbd = 0x01f8c974;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x01f8ac24;   // damagecalculation::calculation
offset.random.ret.rangeint_2_cb_ac = 0x01f5f638;  // characterbuff::applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0x160;  //get from collisionHitAttribute::get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xac;  //get
offset.collisionhitattribute.charactertype = 0xa4;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xb0;  //get  !!!!!
