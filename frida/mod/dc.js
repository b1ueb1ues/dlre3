var ctx = {};

gl.sp();
//gl.invincible();
gl.dummy();
//gl.rangeint();
gl.rangefloat();

if(0)
hook(
offset.damagecalculation.calculationbasedamage
,{  //DamageCalculation$$CalculationBaseDamage
    onEnter: function(args){
    },
    onLeave: function(retval){
        console.log('basedmg: '+p2f(retval));  //use s register lead to 0 return
        //retval.replace(f2i(10000.0));
    }
});

if(1)
hook(
offset.damagecalculation.calculation
, {
    onEnter: function(args){
        //console.log('calc start');
        this.tis = args[0];
        this.attr = args[1];
        this.dst = args[2]
        var coef = this.attr.add(
            offset.damagecalculation.coef
            ).readFloat();
        console.log('\ndmgcoef: '+coef);

    },
    onLeave: function(retval){
        //console.log('calc end');

        var o_ds = offset.damagestatus;
        var o_dc = offset.damagecalculation;
        var o_cha = offset.collisionhitattribute;


        var p_ds = arrow(this.tis, o_dc.normal); //damagestatues normal

        var dmg = p_ds.add(o_ds.value);

        //cb = arrow(this.attr,0x24); //characterbase owner
        //ct = cb.add(0xb8).readInt(); //charactertype
        var ct = this.attr.add(o_cha.charactertype).readInt();


        var damage = dmg.readInt() ; //value
        var iscrit = p_ds.add(o_ds.iscrit).readU8()
        var cha = this.attr // collisionhitattribute
        if(ct==0){
            console.log('dmg: '+damage);
        } 
        else if (1) {
            dmg.writeInt(0);
            //var _id = this.attr.add(0xb8).readPointer();
            //console.log(hexdump(_id));
        }
    }
});

if(1)
hook(
offset.characterbase.get_attack
,{
    onEnter: function(args){
    },
    onLeave: function(retval){
        var bt = Thread.backtrace(this.context)
        var cb_ga = lib_base.add(
            offset.characterbase.ret.get_attack_2_dc_cbd
        ).toString();
        if (bt[0].toString() == cb_ga) {
            console.log('get_atk: '+retval.toInt32());
        }
    }
});


if(0)
hook(
offset.characterbase.getmaxsp // getmaxsp
, {
    onEnter: function(args){
        this.tis = args[0];
        this.idx = args[1];
    },
    onLeave: function(ret){
        console.log('getmaxsp: '+this.idx+':'+ret);
    }
});


if(0)
hook(
offset.characterbufftriggerreactionbomb.execdebuffextradamage
,{
    onEnter: function(args) {
        var tis = args[0];
        var p_br = args[1];
        var damage = p_br.add(
            offset.buffrecord.damage
        ).readS32();
        var dst = p_br.add(
            offset.buffrecord.dst
        ).readPointer();
        var src = p_br.add(
            offset.buffrecord.src
        ).readPointer();

        var actioncontainer = tis.add(
            offset.characterbufftriggerreactionbomb.container
        ).readPointer();
        var actionid = actioncontainer.add(
            offset.actioncontainer.actionid
        ).readS32();
        
        this.attr = tis.add(0x28).readPointer();
        //var _id = this.attr.add(0xb8).readPointer();
        //console.log(hexdump(_id));
        var coef = this.attr.add(
            offset.damagecalculation.coef
            ).readFloat();
        console.log('\ndmgcoef: '+coef);
        console.log('cbtrb::eded', damage, 0, src, dst, actionid, 0);
    },
    onLeave: function(ret){
    }
});
