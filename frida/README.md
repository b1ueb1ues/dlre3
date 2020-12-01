# may only compatible with arm64 Android devices

## requirement
```
pip3 install frida-tools
```
adb connect to Android device 

run fridaserver in devices

## usage
use build-in file output, this method will split each fight into recount/out.2.csv recount/out.3.csv ...
`python3 skada.py out`

use os redirect to file:
`python3 skada.py > recount/out.csv`

## config (at title of skada.py)
- DPSRANGE: seconds for current dps calc
- ENGINE:  skada.js(outdated) hook applydamage, details.js hook showdamageui

