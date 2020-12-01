#!/usr/bin/env python3
import sys
from lib import hfrida

if len(sys.argv) > 1:
    mod = sys.argv[1]
    if '.js' not in mod:
        mod = 'mod/%s.js'%mod
else:
    mod = 'mod/dc.js'

f = hfrida()
f.proc_name = 'com.nintendo.zaga'
f.lib_name = 'libil2cpp.so'
f.engine = 'v8'
f.spawn = False
f.jnclude = ['lib/bin.js', 'auto/symbol.js', 'jnclude/utils.js', 'jnclude/gl.js', 'jnclude/savetheday.js']
f.run(mod)
f.wait()



