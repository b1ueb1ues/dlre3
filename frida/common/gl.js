var gl = {}

// CharacterBase$$get_attack
gl.attack = function (attack, eattack) {
    hook(
    offset.characterbase.get_attack
    ,{ 
        onEnter: function(args){
            var cb = args[0];
            var o_cb = offset.characterbase;
            var ct = star.i(cb, o_cb.charactertype);
            this.ct = ct;
        },
        onLeave: function(retval){
            if(this.ct != 1){
                if (attack)
                    retval.replace(attack);
            }
            else{
                if (eattack)
                    retval.replace(1);
            }
        }
    });
}

// CharacterBase$$IsInvincibleOnHitCheck
gl.invincible = function () {
    hook(
    offset.characterbase.isinvincibleonhitcheck
    ,{ 
        onEnter: function(args){
            var o_cb = offset.characterbase;
            var o_cha = offset.collisionhitattribute;
            var cb = args[0];          //characterbase owner
            var p_ct = cb.add(o_cb.charactertype); 
            var ct = p_ct.readInt();   //charactertype
            this.ct = ct;

            var cha = args[1];
            var ahet = cha.add(o_cha.actionhitexectype).readInt();  // actionhitexectype
            this.ahet = ahet;
            //console.log('actionhitexectype: '+ahet);
        },
        onLeave: function(retval){
            if(this.ct == 0){
                if(this.ahet == 1){
                    retval.replace(1);
                }
                else if(this.ahet == 6){
                    retval.replace(1);
                }
            }
        }
    });
}

gl.dummy = function () {
    hook(
    offset.enemyctrl.setaiaction
    ,{
        onEnter: function(args){
            //console.log('onEnter:'+args[0]); //+args[0]);
            this.context.x1 = 0;
        },
        onLeave: function(ret){
        }
    });
}

gl.sp = function (sp) {
    if (!sp)
        sp = 20000;

    hook(
    offset.characterbase.recoverysp
    ,{
        onEnter: function(args){
            console.log('** sp: '+args[1].toInt32());
            this.context.x1 = sp;
        },
        onLeave: function(retval){
        }
    });
}


gl.rangeint = function (crit, proc) {
    hook(
    offset.random.randomrangeint
    ,{  //random$$range (int)
        onEnter: function(args){
            var bt = Thread.backtrace(this.context);
            var dc_cbd = lib_base.add(
                offset.random.ret.rangeint_2_dc_cbd
            ).toString();
            var cbuf_ac  = lib_base.add(
                offset.random.ret.rangeint_2_cb_ac
            ).toString();  //characterbuff applycommon
            //var pc_sas  = lib_base.add(
            //).toString(); //setactionskill

            var caller = bt[0].toString()
            if (caller == dc_cbd) {
                this.dc_cbd = 1;
            } else if (caller == cbuf_ac){
                this.cbuf_ac = 1;
            //} else if (caller == pc_sas) {
            //    this.pc_sas = 1;
            } else{
                //console.log('r:rri else:'+ptr(bt[0]).add(0-lib_base));
            }
        },
        onLeave: function(ret){
            if (this.dc_cbd ) {
                console.log('r:rri dc_cbd: '+ret);
                if (crit!==null)
                    ret.replace(crit);
            }
            if (this.cbuf_ac ) {
                console.log('r:rri cb_ac: '+ret);
                if (proc!==null)
                    ret.replace(proc);
            }
            //if (this.pc_sas ) {
            //    console.log('r:rri pc_sas: '+ret);
            //    ret.replace(95);
            //}
        }
    });
}

gl.rangefloat = function (dcc) {
    if (!dcc) 
        dcc = 1.0;
    hook(
    offset.random.rangefloat
    ,{  //random$$range float
        onEnter: function(args){
            this.spread = 0;
            var bt = Thread.backtrace(this.context)
            var dc_c = lib_base.add(
                offset.random.ret.rangefloat_2_dc_calculation
            ).toString();

            if (bt[0].toString() == dc_c) {
                this.dcc = 1;
            }
            else{
            }
        },
        onLeave: function(ret){
            if (this.dcc) {
                var p1 = ptr(this.context.sp-0x80-0x10);
                var o = p1.readFloat();
                p1.writeFloat(dcc);
                console.log('rangefloat:', o.toFixed(2), '->', dcc);
            }
        }
    });
}


