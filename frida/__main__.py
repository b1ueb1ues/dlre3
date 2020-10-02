import sys
import conf
import lib

if len(sys.argv) > 1:
    mod = sys.argv[1]
else:
    mod = conf.default
if '.js' not in mod:
    mod = 'mod/%s.js'%mod
lib.run(mod, conf)
sys.stdin.read()

