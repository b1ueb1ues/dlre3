dir=`dirname $0`
echo - cp libil2cpp.so ------
adb push $dir/device/lib.sh /data/local/tmp
adb shell 'chmod +x /data/local/tmp/lib.sh'
adb shell su -c '/data/local/tmp/lib.sh'
echo - adb pull /data/local/tmp/libil2cpp.so ------
adb pull /data/local/tmp/libil2cpp.so $dir/../working
