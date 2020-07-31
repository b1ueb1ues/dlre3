
//gl.sp();
//gl.rangeint(crit, proc);
//gl.rangefloat();
//gl.invincible();
//gl.dummy();

if (1)
hook( 
0x024e5418
,{ 
    onEnter: function(args){
        this.r = args[0].readPointer();
        var name = arrow(this.r, 0x10);
        print(name.readCString());

        var tmp;
        var t = ptr(args[0]);
        var rec = t.add(0x10).readPointer();
        var dk = t.add(0x18).readPointer();
        if (dk > 0x6f00000000) {
            print('dk');
            tmp = dk.readPointer();
            print(hexdump(tmp));
        }
        print(rec);
        if (rec > 0x6f00000000) {
            print('rec');
            tmp = rec.readPointer();
            print(hexdump(tmp));
        }
        //var dk = arrow(this.r, 0x18);
        //var tmp = arrow(this.r, 0);
        ////print(hexdump(this.r.add(0-0x10)));
        //print(hexdump(tmp.add(0x10).readPointer().readPointer()));
    },
    onLeave: function(ret){
    }
});

