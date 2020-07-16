
gl.sp();
//gl.rangeint();
//gl.rangefloat();
gl.invincible();
gl.dummy();


var g_gpt = new NativeFunction(
    lib_base.add(
        offset.maingamectrl.getgameplaytime
    ),
    'float', ['pointer']
);

var g_mgc = new NativeFunction(
    lib_base.add(
        offset.maingamectrl.get_instance
    ),
    'pointer', []
);

var mgc = g_mgc();

function now() {
    return g_gpt(mgc);
}

print(now());

