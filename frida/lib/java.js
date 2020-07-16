function jhook(cname, fname, sign) {
    var interceptor = {};
    interceptor._onEnter = function() {}
    interceptor.onEnter = function(func) {
        interceptor._onEnter = func;
        return this;
    }
    interceptor._onLeave = function() {}
    interceptor.onLeave = function(func) {
        interceptor._onLeave = func;
        return this;
    }
    var f = null;
    if (sign) {
        f = Java.use(cname)[fname];
        f = f.overload.apply(f, sign);
    } else {
        f = Java.use(cname)[fname];
    }
    f.implementation = function() {
        var ctx = {};
        ctx._buffer = null;
        ctx._replace = 0;
        ctx.print = _print.bind(ctx);
        ctx.flush = _flush.bind(ctx);
        ctx.doc = _doc.bind(ctx);
        ctx.dict = _dict.bind(ctx);
        ctx.bt = _bt.bind(ctx);
        ctx.replace = _replace.bind(ctx);
        ctx.keys = _keys.bind(ctx);
        this._ = ctx;
        for (var i in ctx) {
            this[i] = ctx[i];
        }

        var r;
        var ret=null;

        //  pre execute
        r = interceptor._onEnter.apply(this, arguments);
        ctx.flush();
        if (!ctx._replace){
            if (r)
                ret = f.apply(this, r);
            else 
                ret = f.apply(this, arguments);
        }

        //  post execute
        r = interceptor._onLeave.call(this, ret);
        ctx.flush();
        if (r)
            return r;
        else
            return ret;
    }
    return interceptor;
}

function _replace() {
    this._replace = 1;
}


var _ctx = {};
_ctx._replace = 0;
_ctx._buffer = null;

var _threadef = null;
var _threadinstance = null;
var _bt = function () {
    if (!_threadef) {
        _threadef = Java.use('java.lang.Thread');
        _threadinstance = _threadef.$new();
    }
    var stack = _threadinstance.currentThread().getStackTrace();
    var at = "backtrace:\n";
    for(var i = 0; i < stack.length; ++i){
        at += stack[i].toString() + "\n";
    }
    this._buffer += at;
    return at;
}.bind(_ctx);

var _print = function () {
    if (!this._buffer)
        this._buffer = '';
    for (var i in arguments) {
        if (i!=0)
            this._buffer += ' ';
        this._buffer += arguments[i];
    }
    this._buffer += '\n';
}.bind(_ctx);

var _flush = function () {
    if (this._buffer) {
        console.log(this._buffer, );
        this._buffer = null;
    }
}.bind(_ctx);

var _keys = function (o) {
    if (!this._buffer)
        this._buffer = '';
    this._buffer += '$ownMembers of:\n\t'
    this._buffer += o + '\n';
    this._buffer += o.$ownMembers;
    this._buffer += '\n';
}.bind(_ctx);

var _doc = function (o, novalue) {
    if (!this._buffer)
        this._buffer = '';
    this._buffer += 'doc of:\n\t'+o+'\n';
    for (var k in o) {
        if (novalue) {
            var v = '';
        } else {
            try {
                var v = o[k];
            } catch(e) {
                var v = '[_]';
            }
            var t = typeof(v);
            if (t=='function') {
                v = '['+t+']';
            }
        }
        if (k.length < 24) {
            this._buffer += k;
            for (var i=k.length; i<24; i++){
                this._buffer += ' ';
            }
            this._buffer += v + '\n';
        }
        else {
            this._buffer += k + '\t' + v + '\n';
        }
    }
}.bind(_ctx);

var _dict = function (o) {
    if (!this._buffer)
        this._buffer = '';
    var keys = Object.getOwnPropertyNames(o.__proto__);
    var k, v;
    for (var i in keys) {
        k = keys[i];
        try {
            var t = typeof(o[k]);
            if (t=='function') {
                v = '['+t+']';
            } else {
                v = o[k];
            }
        } catch(e) {
            v = '[_]';
        }
        if (k.length < 24) {
            this._buffer += k;
            for (var i=k.length; i<24; i++){
                this._buffer += ' ';
            }
            this._buffer += v + '\n';
        }
        else {
            this._buffer += k + '\t' + v + '\n';
        }
    }
}.bind(_ctx);


