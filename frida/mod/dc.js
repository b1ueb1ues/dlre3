var ctx = {};

savetheday();
gl.sp(1);
gl.dp();
//gl.invincible();
gl.dummy();
//gl.rangeint();
gl.rangefloat();

// time init
var g_gpt = new NativeFunction(m.lib_base.add(
    offset.maingamectrl.getgameplaytime
),'float', ['pointer']);
var g_mgc = new NativeFunction(m.lib_base.add(
    offset.maingamectrl.get_instance
),'pointer', []);
var mgc = null;
function now_init(){ 
    mgc = g_mgc(); 
    return mgc;
}
function now() { return g_gpt(mgc).toFixed(3); }

/**
 * send t0 first
 */
if(now_init()==0)
    send({hook:'init', t0:0});
else
    send({hook:'init', t0:now()});

hook(
offset.maingamectrl.playqueststart,
{
    onEnter: function(args){
        now_init();
        send({hook:'start', t0:0});
        console.error('quest_start\n==============================');
    },
    onLeave: function(retval){
    }
});


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
        console.log('\nts: ', now());
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

if(1)
hook(
offset.characterbase.get_defense
,{
    onEnter: function(args){
    },
    onLeave: function(retval){
        var r = ptr(this.context.sp-0x90);
        var d = r.readFloat();
        console.log('get_def: '+d);
    }
});


if(1)
hook(
offset.characterbase.get_hprate
,{
    onEnter: function(args){
    },
    onLeave: function(retval) {
        var r = ptr(this.context.sp-0x100+0x70);
        // baseatk: 3124 with +60%hp
        // r.writeFloat(1);    // atk: 4999
        // r.writeFloat(0.9);  // atk: 4686
        // r.writeFloat(0.8);  // atk: 4374
        // r.writeFloat(0.75); // atk: 4218
        // r.writeFloat(0.71); // atk: 4093
        // r.writeFloat(0.7);  // atk: 4062
        // r.writeFloat(0.6);  // atk: 4062
        // r.writeFloat(0.5);  // atk: 4062
        // r.writeFloat(0.4);  // atk: 4062
        // r.writeFloat(0.3);  // atk: 4062
        // r.writeFloat(0.2);  // atk: 4062
        // r.writeFloat(0.01); // atk: 4062

        // baseatk: 4374 with +35%hpatk
        //r.writeFloat(0.6); // atk: 4941
        //r.writeFloat(0.7); // atk: 4941
        //r.writeFloat(0.8); // atk: 5130
        //r.writeFloat(1); // atk: 5508
        //3230
        //r.writeFloat(0.9); // atk: 4845
        //r.writeFloat(0.7); // atk: 4199
        //r.writeFloat(0.6); // atk: 4232
        //r.writeFloat(0.5); // atk: 4232
    }
});



if(1)
hook(
offset.characterbase.getmaxsp // getmaxsp
, {
    onEnter: function(args){
        this.tis = args[0];
        this.idx = args[1];
    },
    onLeave: function(ret){
        console.log('getmaxsp: '+this.idx+':'+ret.toInt32());
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
        console.log('\nts: ', now());
        console.log('dmgcoef: '+coef);
        console.log('cbtrb::eded', damage, 0, src, dst, actionid, 0);
    },
    onLeave: function(ret){
    }
});
