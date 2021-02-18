#!/usr/bin/env python3
import os
from lib import hfrida

f = hfrida()
f.proc_name = 'com.nintendo.zaga'
f.lib_name = 'libil2cpp.so'
f.engine = 'v8'
f.jnclude = ['lib/bin.js', 'auto/symbol.js', 'jnclude/utils.js', 'jnclude/savetheday.js']

f.js_body = 'savetheday();'
f.run()

os.system('cp .tmp.js savetheday/savetheday_lite.js');
os.system('adb push savetheday/savetheday_lite.js /data/local/tmp')
