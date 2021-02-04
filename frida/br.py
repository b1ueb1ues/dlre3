#!/usr/bin/env python3
import sys
from lib import hfrida
import os, time

js = 'mod/br.js'

f = hfrida()
f.proc_name = 'com.nintendo.zaga'
f.lib_name = 'libil2cpp.so'
f.engine = 'v8'
f.spawn = False
f.jnclude = ['lib/bin.js', 'auto/symbol.js', 'jnclude/utils.js']

def _on_message(message, data):
    if message['type'] == 'send':
        msg = message['payload']
        print(msg)
        if msg == 'BattleRoyalSelectJobPopup::Create':
            print('1')
            time.sleep(0.5);
            os.system('adb shell su -c /data/local/tmp/tap.sh 900 1000')
        elif msg == 'BattleRoyalFinalConfirmPopup::Create':
            print('2')
            time.sleep(0.5);
            os.system('adb shell su -c /data/local/tmp/tap.sh 900 1400')
        elif msg == 'MainGameCtrl::CreateContinueDialog':
            print('3')
            time.sleep(0.5);
            os.system('adb shell su -c /data/local/tmp/tap.sh 500 2050')

            time.sleep(7);
            os.system('adb shell su -c /data/local/tmp/tap.sh 520 1600')
            time.sleep(5);
            os.system('adb shell su -c /data/local/tmp/tap.sh 520 1600')
            time.sleep(5);
            os.system('adb shell su -c /data/local/tmp/tap.sh 750 2100')


f.on_message = _on_message
f.run(js)

while 1:
    os.system('adb shell su -c /data/local/tmp/tap.sh 900 1600')
    time.sleep(1)
    os.system('adb shell su -c /data/local/tmp/tap.sh 700 1460')
    #time.sleep(1)
    #os.system('adb shell su -c /data/local/tmp/tap.sh 500 2050')
    time.sleep(5)

f.wait()




