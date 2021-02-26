var ctx = {};

gl.sp();
//gl.rangeint();
gl.rangefloat();
gl.invincible();
//gl.dummy();

if (1)
hook( // CollisionHitAttribute$$get_ToBreakDmgRate
offset.collisionhitattribute.get_tobk
,{  
    onEnter: function(args){
        //var bkrate = arrow.f(args[0], 0x168);
        //console.log('toOdRate_in: '+bkrate);
    },
    onLeave: function(retval){
        var bkrate = ptr(this.context.sp-0x90).readFloat();
        console.log('toBkRate_ret: '+bkrate);
    }
});


if (1)
hook( // CtrlOverdrive::OnDamaged
offset.ctrloverdrive.ondamaged
,{  
    onEnter: function(args){
        this.odhp = ptr(args[0]).add(0x38)
        this.o1 = this.odhp.readFloat();
        console.log('ctrlOD_in: '+this.o1);
    },
    onLeave: function(ret){
        if (this.context.x19 != 0){
            this.o2 = this.odhp.readFloat();
            console.log('ctrlOD_out: '+this.o2);
            console.log('ctrlOD_d: '+(this.o2-this.o1));
        }
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
        console.log('dmgcoef: '+coef);

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

