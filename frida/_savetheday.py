#!/usr/bin/env python3
import os
import auto.__main__ as auto
from lib import hfrida

auto.path_template = 'savetheday/savetheday_template.js'
auto.path_out = 'savetheday/savetheday.js'
auto.js_symbol()

f = hfrida()
f.proc_name = 'com.nintendo.zaga'
f.lib_name = 'libil2cpp.so'
f.engine = 'v8'
f.spawn = False
f.jnclude = ['lib/bin.js', 'jnclude/utils.js', 'savetheday/savetheday.js']

f.run()

os.system('cp .tmp.js savetheday/savetheday_lite.js');
os.system('adb push savetheday/savetheday_lite.js /data/local/tmp')
