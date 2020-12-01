var m = module(__libname__);
var hook = m.hook.bind(m);
var bt = m.bt.bind(m);
var pfn = m.lib_base.add(offset.datetime.get_utcnow);
var get_time = new NativeFunction(pfn, 'uint64', []);
