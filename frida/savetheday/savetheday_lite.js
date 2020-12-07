var __libname__ = "libil2cpp.so"
function print() { console.log.apply(null, arguments); }

var arrow = function(p, offset) { return p.add(offset).readPointer(); }
arrow.p = function(p, offset) { return p.add(offset).readPointer(); }
arrow.i = function(p, offset) { return p.add(offset).readInt(); }
arrow.f = function(p, offset) { return p.add(offset).readFloat(); }
arrow.d = function(p, offset) { return p.add(offset).readDouble(); }

var star = function(p) { return p.readPointer(); }
star.p = function(p) { return p.readPointer(); }
star.i = function(p) { return p.readInt(); }
star.f = function(p) { return p.readFloat(); }
star.p = function(p) { return p.readDouble(); }

var myp=0;
var mypp=0;
myp = Memory.alloc(4);
mypp = Memory.alloc(8);
function r2i(r){ return r.toInt32(); }
function r2f(r){ myp.writeInt(r.toInt32()); return myp.readFloat(); }
function r2d(r){ mypp.writeInt(r.toInt32()); return mypp.readDouble(); }

function dict(o) {
    var keys = Object.getOwnPropertyNames(o.__proto__);
    for (var i in keys) {
        try {
            console.log(keys[i], '\t', o[keys[i]]);
        } catch(e) {
            console.log(keys[i]);
        }
    }
}

function module(libname) { return new _module(libname); }
function _module(libname) {
    if (libname == undefined)
        this.lib_name = __libname__;
    else
        this.lib_name = libname;
    this.lib_base = Module.findBaseAddress(this.lib_name);
    console.error('[+] process_id: '+Process.id);
    console.error('[+] lib_base: '+this.lib_base);
    this.hook = function(address, hook) {
        Interceptor.attach(this.lib_base.add(address), hook);
    }
    this.bt = function(context){
        var b = Thread.backtrace(context);
        console.log('bt');
        for (var i in b) {
            console.log(ptr(b[i]).sub(this.lib_base));
        }
    }
}



var m = module(__libname__);
var hook = m.hook.bind(m);
var bt = m.bt.bind(m);
//var pfn = m.lib_base.add(offset.datetime.get_utcnow);
//var get_time = new NativeFunction(pfn, 'uint64', []);

function savetheday () {
    // save the day
    hook(
    0x182BD54 // offset.ingameuictrl.showdamageui
    ,{
        onEnter: function (args) {
            //this.context.x3 = 0; //crit
            //this.context.x5 = 2;  //ele
            this.context.sp.writeInt(0); // isplayerctrl
        }
    });

    // save the day
    hook(
    0x183CFC8 // offset.ingameuictrl.setmovein
    ,{
        onEnter: function (args) {
            if (args[1] == 0)
                this.context.x1 = 1;
        }
    });

    // save the day
    hook(
    0x19CFE48 // offset.maingameleavealonechecker.setleavealonetime
    ,{
        onEnter: function(args){
            this.tis = args[0];
            console.error('- unsetleavealone');
        },
        onLeave: function(retval){
            var tis = this.tis;
            tis.add(offset.maingameleavealonechecker.warnningtime).writeFloat(100000);
            tis.add(offset.maingameleavealonechecker.exittime).writeFloat(100000);
        }
    });

    // fuck google
    var fuck = 0;
    hook(
    0x2810540 // offset.paymenttimer.startcounting
    ,{
        onEnter: function(args){
            var t = ptr(this.context.sp-0x80-0x10);
            t.writeFloat(0.01);
            fuck = 1;
        },
        onLeave: function(ret){
            var t = ptr(this.context.sp-0x80-0x10);
            t.writeFloat(0.01);
        }
    });

    // fuck google
    hook(
    0x3B19480 // offset.platformutil.ismobile
    ,{
        onEnter: function(args){
        },
        onLeave: function(ret){
            if(fuck) {
                console.error('- fxxkgoogle');
                ret.replace(0);
                fuck = 0;
            }
        }
    });
}
savetheday();

