# may only compatible with arm64 Android devices

## requirement
```
pip3 install frida-tools
```
adb connect to Android device 

run fridaserver in devices

## usage
use os redirect to file:
```
python3 skada.py > recount/out.csv
```
use build-in file output, this method will split each fight into recount/out.2.csv recount/out.3.csv ...
```    
python3 skada.py out
```
