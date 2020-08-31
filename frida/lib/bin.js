var tzero = [0x30];
var tone = [0x31];
var tfloat = [0x66,0x6c,0x6f,0x61,0x74];
var tstderr = [0x73,0x74,0x64,0x65,0x72,0x72];

var arrow = function(p, offset) {
    return p.add(offset).readPointer();
}
arrow.p = function(p, offset) {
    return p.add(offset).readPointer();
}
arrow.i = function(p, offset) {
    return p.add(offset).readInt();
}
arrow.f = function(p, offset) {
    return p.add(offset).readFloat();
}
arrow.d = function(p, offset) {
    return p.add(offset).readDouble();
}

var star = function(p) {
    return p.readPointer();
}
star.p = function(p) {
    return p.readPointer();
}
star.i = function(p) {
    return p.readInt();
}
star.f = function(p) {
    return p.readFloat();
}
star.p = function(p) {
    return p.readDouble();
}


var myp=0;
var mypp=0;
myp = Memory.alloc(4);
mypp = Memory.alloc(8);
function r2i(r){
    return r.toInt32();
}
function r2f(r){
    myp.writeInt(r.toInt32());
    return myp.readFloat();
}
function p2i(r){
    return r.toInt32();
}
function p2f(r){
    myp.writeInt(r.toInt32());
    return myp.readFloat();
}
function p2d(r){
    mypp.writeInt(r.toInt32());
    return mypp.readDouble();
}

function i2f(r){
    myp.writeInt(r.toInt32());
    return myp.readFloat();
}
function f2i(r){
    myp.writeFloat(r);
    return myp.readInt();
}
function i2d(r){
    mypp.writeInt(r.toInt32());
    return mypp.readDouble();
}


var lib_base = Module.findBaseAddress(__libname__);
if(0){
    console.log('process_id: '+Process.id);
    console.log('lib_base: '+lib_base);
}else{
    send('process_id: '+Process.id, tstderr);
    send('lib_base: '+lib_base, tstderr);
}

function hook(address, process){
    Interceptor.attach( lib_base.add(address) , process);
}

function bt(t){
    var b = Thread.backtrace(t.context);
    console.log('bt');
    for (var i in b) {
        console.log(ptr(b[i]).add(0-lib_base));
    }
}

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

function print() {
    console.log.apply(null, arguments);
}
