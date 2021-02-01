var m = module(__libname__);
var hook = m.hook.bind(m);
var bt = m.bt.bind(m);
var lib_base = m.lib_base;

var g_gpt = new NativeFunction(m.lib_base.add(
    offset.maingamectrl.getgameplaytime
),'float', ['pointer']);
var g_mgc = new NativeFunction(m.lib_base.add(
    offset.maingamectrl.get_instance
),'pointer', []);
var mgc = null;
var now = function() {
    if (mgc)
        return g_gpt(mgc).toFixed(3);
    mgc = g_mgc(); 
    if (mgc)
        return g_gpt(mgc).toFixed(3);
    else
        return -1;
}

var pfn = m.lib_base.add(offset.datetime.get_utcnow);
now.utc = new NativeFunction(pfn, 'uint64', []);

