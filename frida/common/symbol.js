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
offset.characterbase.isdragon = 0x538;

offset.dragoncharacter.human = 0x6F8;

offset.characterparameter.fptotal = 0x98;

offset.fluctuationparameter.abnormalresist = 0x70;

offset.characterid.actorid = 0x10;
offset.characterid.index = 0x12;

offset.collisionhitattribute.actionhitexectype = 0xF0;

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

offset.datetime.get_utcnow = 0x2FC7CF0;

offset.damagecalculation.calculation = 0x18F25B0;
offset.damagecalculation.calculationbasedamage = 0x18F3670;

offset.characterbase.get_maxhp = 0x181DDE8;
offset.characterbase.get_attack = 0x181DF90;
offset.characterbase.get_defense = 0x181E034;
offset.characterbase.get_defcoef = 0x181E0A4;
offset.characterbase.get_hprate = 0x181DE7C;
offset.characterbase.recoverysp = 0x1843EEC;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x1822AD8;
offset.characterbase.applydamage = 0x183A990;
offset.characterbase.applyslipdamage = 0x183B864;
offset.characterbase.calcabnormalstatusdamage = 0x183B67C;

offset.characterbase.setabnormalstatus = 0x183F314;
offset.characterbase.getmaxsp = 0x1841EEC;
offset.characterbase.showdamageui = 0x1837A88;

offset.enemycharacter.ondamaged = 0x1F7524C;

offset.maingameleavealonechecker.setleavealonetime = 0x1A349B0;

offset.maingamectrl.playqueststart = 0x18AA4C4;
offset.maingamectrl.getgameplaytime = 0x18AC34C;
offset.maingamectrl.get_instance = 0x189E4C0;

offset.actionconditionelement.get_rate = 0x244EA3C;

offset.random.rangefloat = 0x3615064;   // first range()
//offset.random.rangeint = 0x36150D4;   // second range()
offset.random.randomrangeint = 0x36150D8; 
offset.enemyctrl.setaiaction = 0x1F8209C;

offset.collisionhitattribute.get_damageadjustment = 0x1ABD7C8;
offset.collisionhitattribute.get_tobk = 0x1ABD7F0;

offset.chainctrl.add = 0x1E98208;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x2000A14;

offset.ingameuictrl.showdamageui = 0x17E17D0;
offset.ingameuictrl.setmovein = 0x17F1A78;

offset.ctrloverdrive.ondamaged = 0x18E51FC;

offset.characterbuff.applycommon = 0x21F1BEC;
offset.characterbuff.apply = 0x21DF28C;


/**
 * dynamic
 */
offset.characterbase.ret = {};
offset.random.ret = {};

/**
 * return address
 */
offset.characterbase.ret.get_attack_2_dc_cbd = 0x018f40f4;  // to calculationbasedamage
offset.random.ret.rangeint_2_dc_cbd = 0x018f43ac;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x018f2910;   // damagecalculation::calculation
offset.random.ret.rangeint_2_cb_ac = 0x021f1f9c;  // characterbuff::applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0x12c;  //get from collisionHitAttribute::get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get  !!!!!
