
var guv = new NativeFunction(
    lib_base.add(
        0x03533010 // Application::get_unityVersion
    ),
    'pointer', []
);

var p = guv();
print(p.add(20).readUtf16String());

