
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
offset.characterbase.isdragon = 0x590;

offset.dragoncharacter.human = 0x788;

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

offset.datetime.get_utcnow = 0x2DB17D8;

offset.damagecalculation.calculation = 0x1F2DE50;
offset.damagecalculation.calculationbasedamage = 0x1F2F18C;

offset.characterbase.get_maxhp = 0x182859C;
offset.characterbase.get_attack = 0x1828744;
offset.characterbase.get_defense = 0x18287E8;
offset.characterbase.get_defcoef = 0x1828858;
offset.characterbase.get_hprate = 0x1828630;
offset.characterbase.recoverysp = 0x1853470;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x182DD4C;
offset.characterbase.applydamage = 0x1848F1C;
offset.characterbase.applyslipdamage = 0x1849E48;
offset.characterbase.calcabnormalstatusdamage = 0x1849C88;

offset.characterbase.setabnormalstatus = 0x184DD14;
offset.characterbase.getmaxsp = 0x1850E34;
offset.characterbase.getsp = 0x1850C54;
offset.characterbase.showdamageui = 0x1845F5C;

offset.characterbase.cancancelaction = 0x1833C68;
offset.humancharacter.getavoidactionid = 0x17D3174;

offset.enemycharacter.ondamaged = 0x193BECC;

offset.maingameleavealonechecker.setleavealonetime = 0x1A90CBC;

offset.maingamectrl.playqueststart = 0x180CF14;
offset.maingamectrl.getgameplaytime = 0x180EEA4;
offset.maingamectrl.get_instance = 0x17FFB20;
offset.maingamectrl.createcontinuedialog = 0x180DC48;

offset.actionconditionelement.get_rate = 0x26F2E84;

offset.random.rangefloat = 0x36701D4;   // first range()
//offset.random.rangeint = 0x3670244;   // second range()
offset.random.randomrangeint = 0x3670248; 
offset.enemyctrl.setaiaction = 0x248F68C;

offset.collisionhitattribute.get_damageadjustment = 0x1EBDB08;
offset.collisionhitattribute.get_tobk = 0x1EBDB30;
offset.collisionhitattribute.get_additionrecoverydp = 0x1EBDB58;

offset.chainctrl.add = 0x23B67CC;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x2634728;

offset.ingameuictrl.showdamageui = 0x18BDA1C;
offset.ingameuictrl.setmovein = 0x18CF090;
offset.ingameuictrl.showrecoverhp = 0x18BDF5C;

offset.ctrloverdrive.ondamaged = 0x1CA197C;

offset.characterbuff.applycommon = 0x1DF6C14;
offset.characterbuff.apply = 0x1DE1834;
offset.characterbuff.applybyability = 0x1DF6194;
offset.recoverstaminamethodselectpopup.isinshopmantenance = 0x1B6CDB8;

offset.abnormalstatusbase.setup = 0x1D26188;
offset.abnormalstatusbase.calcslipdamage = 0x1D2667C;
offset.abnormalstatusenemybase.addition = 0x1D28E74;
offset.paymenttimer.startcounting = 0x2A3AF3C;
offset.platformutil.ismobile = 0x3BFEFC0;

offset.utpctrl.addpoint = 0x19A9AA4;

offset.ingametime.getplaytime = 0x18B493C;
offset.gamespeedtimespan.pause = 0x18B4E3C;

offset.cameramodefollow.load = 0x243C4B8;

offset.brfinalconfirmpopup = 0x1A4329C;
offset.brselectjobpopup = 0x1A477B0;

/**
 * dynamic
 */
offset.characterbase.ret = {};
offset.random.ret = {};

/**
 * return address
 */
offset.characterbase.ret.get_attack_2_dc_cbd = 0x01f2fb48;  // to calculationbasedamage
offset.random.ret.rangeint_2_dc_cbd = 0x01f2fe28;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x01f2e1a8;   // damagecalculation::calculation
offset.random.ret.rangeint_2_cb_ac = 0x01df7028;  // characterbuff::applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0x15c;  //get from collisionHitAttribute::get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xac;  //get
offset.collisionhitattribute.charactertype = 0xa4;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xb0;  //get  !!!!!
