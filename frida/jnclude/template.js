
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


/**
 *  var table
 */

offset.characterbase.characterid = @CharacterBase,<characterId>@;
offset.characterbase.dungeonpartyindex = @CharacterBase,<dungeonPartyIndex>@;
offset.characterbase.dungeonpartyposition = @CharacterBase,<dungeonPartyPosition>@;
offset.characterbase.multiplayid = @CharacterBase,<multiPlayId>@;
offset.characterbase.charactertype = @CharacterBase,<type>@;
offset.characterbase.characterparameter = @CharacterBase,<param>@;
offset.characterbase.isdragon = @CharacterBase,<isUsedTransformDragon>@;

offset.dragoncharacter.human = @DragonCharacter,human@;

offset.characterparameter.fptotal = @CharacterParameter,total@;

offset.fluctuationparameter.abnormalresist = @FluctuationParameter,abnormalResist@;

offset.characterid.actorid = @CharacterId,actorId@;
offset.characterid.index = @CharacterId,index@;

offset.collisionhitattribute.actionhitexectype = @CollisionHitAttribute,_HitExecType@;
offset.collisionhitattribute.id = @CollisionHitAttribute,_Id@;

offset.damagestatus.value = @DamageStatus,<value>@;
offset.damagestatus.iscrit = @DamageStatus,<isCritical>@;

offset.damagecalculation.normal = @DamageCalculation,normal@;

offset.attackhit.damage = @AttackHit,damage@;
offset.attackhit.iscrit = @AttackHit,isCritical@;

offset.maingameleavealonechecker.warnningtime = @MainGameLeaveAloneChecker,_warnningTime@;
offset.maingameleavealonechecker.exittime = @MainGameLeaveAloneChecker,_exitTime@;

offset.slipdamage.type = @SlipDamage,type@;
offset.slipdamage.damage = @SlipDamage,damage@;
offset.slipdamage.attacker = @SlipDamage,attacker@;

offset.characterdamageintermediate.damage = @CharacterDamageIntermediate,damage@;
offset.characterdamageintermediate.damageowner = @CharacterDamageIntermediate,damageOwner@;
offset.characterdamageintermediate.attackhit = @CharacterDamageIntermediate,<attackHit>@;
offset.characterdamageintermediate.collisionhitattribute = @CharacterDamageIntermediate,<hitAttr>@;

offset.characterbufftriggerreactionbomb.container = @CharacterBuffTriggerReactionBomb,_container@;

offset.actioncontainer.actionid = @ActionContainer,actionId@;

offset.buffrecord.damage = @BuffRecord,Damage@;
offset.buffrecord.dst = @BuffRecord,TargetChara@;
offset.buffrecord.src = @BuffRecord,BuffAppender@;

offset.actionconditionelement.atype = @ActionConditionElement,AbnormalStatusType _Type@;
offset.actionconditionelement.rate = @ActionConditionElement,int _Rate@;

offset.abnormalstatusbase.owner = @AbnormalStatusBase,<owner>@;

offset.cameramodefollow.min = @CameraModeFollow,minDistance@;
offset.cameramodefollow.max = @CameraModeFollow,maxDistance@;

/**
 * functions table
 */

offset.datetime.get_utcnow = #DateTime$$get_UtcNow#;

offset.damagecalculation.calculation = #DamageCalculation$$Calculation#;
offset.damagecalculation.calculationbasedamage = #DamageCalculation$$CalculationBaseDamage#;

offset.characterbase.get_maxhp = #CharacterBase$$get_maxHp#;
offset.characterbase.get_attack = #CharacterBase$$get_attack#;
offset.characterbase.get_defense = #CharacterBase$$get_defense#;
offset.characterbase.get_defcoef = #CharacterBase$$get_defCoef#;
offset.characterbase.get_hprate = #CharacterBase$$get_hpRate#;
offset.characterbase.recoverysp = #CharacterBase$$RecoverySp,1#;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = #CharacterBase$$IsInvincibleOnHitCheck#;
offset.characterbase.applydamage = #CharacterBase$$ApplyDamage#;
offset.characterbase.applyslipdamage = #CharacterBase$$ApplySlipDamage#;
offset.characterbase.calcabnormalstatusdamage = #CharacterBase$$CalcAbnormalStatusDamage#;

offset.characterbase.setabnormalstatus = #CharacterBase$$SetAbnormalStatus#;
offset.characterbase.getmaxsp = #CharacterBase$$GetMaxSp#;
offset.characterbase.getsp = #CharacterBase$$GetSp#;
offset.characterbase.showdamageui = #CharacterBase$$ShowDamageUI#;

offset.characterbase.cancancelaction = #CharacterBase$$CanCancelAction#;
offset.humancharacter.getavoidactionid = #HumanCharacter$$GetAvoidActionId#;

offset.enemycharacter.ondamaged = #EnemyCharacter$$OnDamaged#;

offset.maingameleavealonechecker.setleavealonetime = #MainGameLeaveAloneChecker$$SetLeaveAloneTime#;

offset.maingamectrl.playqueststart = #MainGameCtrl$$PlayQuestStart#;
offset.maingamectrl.getgameplaytime = #MainGameCtrl$$GetGamePlayTime#;
offset.maingamectrl.get_instance = #MainGameCtrl$$get_instance#;

offset.actionconditionelement.get_rate = #ActionConditionElement$$get_Rate#;

offset.random.rangefloat = #Random$$Range,1#;   // first range()
//offset.random.rangeint = #Random$$Range,2#;   // second range()
offset.random.randomrangeint = #Random$$RandomRangeInt#; 
offset.enemyctrl.setaiaction = #EnemyCtrl$$SetAIAction#;

offset.collisionhitattribute.get_damageadjustment = #CollisionHitAttribute$$get_DamageAdjustment#;
offset.collisionhitattribute.get_tobk = #CollisionHitAttribute$$get_ToBreakDmgRate#;
offset.collisionhitattribute.get_additionrecoverydp = #CollisionHitAttribute$$get_AdditionRecoveryDp#;

offset.chainctrl.add = #ChainCtrl$$Add,1#;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = #CharacterBuffTriggerReactionBomb$$ExecDebuffExtraDamage#;

offset.ingameuictrl.showdamageui = #InGameUICtrl$$ShowDamageUI#;
offset.ingameuictrl.setmovein = #InGameUICtrl$$SetMoveIn#;
offset.ingameuictrl.showrecoverhp = #InGameUICtrl$$ShowRecoverHP#;

offset.ctrloverdrive.ondamaged = #CtrlOverdrive$$OnDamaged#;

offset.characterbuff.applycommon = #CharacterBuff$$ApplyCommon#;
offset.characterbuff.apply = #CharacterBuff$$Apply,1#;
offset.characterbuff.applybyability = #CharacterBuff$$ApplyByAbility#;
offset.recoverstaminamethodselectpopup.isinshopmantenance = #RecoverStaminaMethodSelectPopup$$IsInShopMaintenance#;

offset.abnormalstatusbase.setup = #AbnormalStatusBase$$Setup#;
offset.abnormalstatusbase.calcslipdamage = #AbnormalStatusBase$$CalcSlipDamage#;
offset.abnormalstatusenemybase.addition = #AbnormalStatusEnemyBase$$Addition#;
offset.paymenttimer.startcounting = #PaymentTimer$$StartCounting#;
offset.platformutil.ismobile = #PlatformUtil$$IsMobile#;

offset.utpctrl.addpoint = #UtpCtrl$$AddPoint#;

offset.ingametime.getplaytime = #InGameTime$$GetPlayTime#;
offset.gamespeedtimespan.pause = #GameSpeedTimeSpan$$Pause#;

offset.cameramodefollow.load = #CameraModeFollow$$LoadFollowDistance#;

/**
 * dynamic
 */
offset.characterbase.ret = {};
offset.random.ret = {};

/**
 * return address
 */
offset.characterbase.ret.get_attack_2_dc_cbd = %s;  // to calculationbasedamage
offset.random.ret.rangeint_2_dc_cbd = %s;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = %s;   // damagecalculation::calculation
offset.random.ret.rangeint_2_cb_ac = %s;  // characterbuff::applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = %s;  //get from collisionHitAttribute::get_DamageAdjustment
offset.collisionhitattribute.actionid = %s;  //get
offset.collisionhitattribute.charactertype = %s;  //get
offset.collisionhitattribute.owner = %s;  //get
offset.collisionhitattribute.skillid = %s;  //get  !!!!!
