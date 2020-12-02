#!/usr/bin/env python3
import os
import auto.__main__ as auto
from lib import hfrida

auto.path_template = 'jnclude/savetheday_lite.js'
auto.path_out = 'auto/savetheday.js'
auto.js_symbol()

f = hfrida()
f.proc_name = 'com.nintendo.zaga'
f.lib_name = 'libil2cpp.so'
f.engine = 'v8'
f.spawn = False
f.jnclude = ['lib/bin.js', 'jnclude/utils.js', 'auto/savetheday.js']

f.run()

os.system('adb push auto/savetheday.js /data/local/tmp')
