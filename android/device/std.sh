dir=`dirname $0`
pid=`ps -A|grep nintendo|awk '{print $2}'`
$dir/frida-core $pid $dir/savetheday.js
