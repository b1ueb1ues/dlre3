#!/usr/bin/env python3
import sys
from lib import hfrida


if len(sys.argv) > 1:
    js = sys.argv[1]
    if '.js' not in js:
        js = 'mod/%s.js'%js
else:
    js = 'mod/dc.js'

f = hfrida()
f.proc_name = 'com.nintendo.zaga'
f.lib_name = 'libil2cpp.so'
f.engine = 'v8'
f.spawn = False
f.jnclude = ['lib/bin.js', 'auto/symbol.js', 'jnclude/utils.js', 'jnclude/gl.js', 'jnclude/savetheday.js']

f.run(js)
f.wait()



