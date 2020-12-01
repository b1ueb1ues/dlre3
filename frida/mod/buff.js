
gl.sp();
//gl.rangeint(crit, proc);
//gl.rangefloat();
gl.invincible();
gl.dummy();

if (1)
hook(
offset.characterbuff.apply
,{
    onEnter: function (args) {
        var conid = args[3].toInt32();
        if(conid == 0) 
            return;

        var o_cha = offset.collisionhitattribute;

        var tmp = {};
        tmp.dst = args[1];
        var cha = args[2];
        var optionsrc = args[4];
        var csstr_hitlabel = arrow(cha, o_cha.id);
        var hitlabel = csstr_hitlabel.add(0x14).readUtf16String();
        tmp.src = arrow(cha, o_cha.owner);  
        tmp.label = 'cb::apply';
        tmp.type = 'buff';
        tmp.aid = cha.add( o_cha.actionid  ).readInt();
        tmp.sid = cha.add( o_cha.skillid   ).readInt();
        tmp.ts = now();
        tmp.dmg = 0;
        tmp.comment = hitlabel + ' ac:' + conid;

        print(tmp.comment);
        commit(tmp);
    }
});

if (1)
hook(
offset.characterbuff.applybyability
,{
    onEnter: function (args) {
        var conid = args[3].toInt32();
        if(conid == 0) 
            return;

        var tmp = {};
        tmp.dst = args[1];
        tmp.src = args[2];
        tmp.aid = args[4];
        tmp.sid = args[5];
        tmp.label = 'cb::aba';
        tmp.type = 'buff';
        tmp.ts = now();
        tmp.dmg = 0;
        tmp.comment = 'ac:' + conid;

        print(tmp.comment);
        commit(tmp);
    }
});





