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

offset.datetime.get_utcnow = 0x2FD4114;

offset.damagecalculation.calculation = 0x18F862C;
offset.damagecalculation.calculationbasedamage = 0x18F96EC;

offset.characterbase.get_maxhp = 0x1821E64;
offset.characterbase.get_attack = 0x182200C;
offset.characterbase.get_defense = 0x18220B0;
offset.characterbase.get_defcoef = 0x1822120;
offset.characterbase.get_hprate = 0x1821EF8;
offset.characterbase.recoverysp = 0x1847F68;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x1826B54;
offset.characterbase.applydamage = 0x183EA0C;
offset.characterbase.applyslipdamage = 0x183F8E0;
offset.characterbase.calcabnormalstatusdamage = 0x183F6F8;

offset.characterbase.setabnormalstatus = 0x1843390;
offset.characterbase.getmaxsp = 0x1845F68;
offset.characterbase.showdamageui = 0x183BB04;

offset.enemycharacter.ondamaged = 0x1F80508;

offset.maingameleavealonechecker.setleavealonetime = 0x1A3CA48;

offset.maingamectrl.playqueststart = 0x18B0540;
offset.maingamectrl.getgameplaytime = 0x18B23C8;
offset.maingamectrl.get_instance = 0x18A453C;

offset.actionconditionelement.get_rate = 0x2459E60;

offset.random.rangefloat = 0x361D488;   // first range()
//offset.random.rangeint = 0x361D4F8;   // second range()
offset.random.randomrangeint = 0x361D4FC; 
offset.enemyctrl.setaiaction = 0x1F8D358;

offset.collisionhitattribute.get_damageadjustment = 0x1AC6860;
offset.collisionhitattribute.get_tobk = 0x1AC6888;

offset.chainctrl.add = 0x1EA14C4;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x200ACD0;

offset.ingameuictrl.showdamageui = 0x17E5860;
offset.ingameuictrl.setmovein = 0x17F5AF4;

offset.ctrloverdrive.ondamaged = 0x18EB278;

offset.characterbuff.applycommon = 0x21FAEA8;
offset.characterbuff.apply = 0x21E8548;


/**
 * dynamic
 */
offset.characterbase.ret = {};
offset.random.ret = {};

/**
 * return address
 */
offset.characterbase.ret.get_attack_2_dc_cbd = 0x018fa170;  // to calculationbasedamage
offset.random.ret.rangeint_2_dc_cbd = 0x018fa428;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x018f898c;   // damagecalculation::calculation
offset.random.ret.rangeint_2_cb_ac = 0x021fb258;  // characterbuff::applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0x12c;  //get from collisionHitAttribute::get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get  !!!!!
