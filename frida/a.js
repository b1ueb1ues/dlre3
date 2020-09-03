

var conf = {};
conf.recent_len = 5;

var c_tdmg = {};
c_tdmg.init = function(tis, t, dmg) {
    tis.t = t;
    tis.dmg = dmg;
}

var c_character = {};
c_character.init = function(tis, tstart) {
    tis.tstart = tstart;
    tis.dmgsum = 0;
    tis.dmg_recent = [];
    tis.tend = 0;
}
c_character.add = function(tis, t, dmg) {
    tis.dmgsum += dmg;
    tis.tend = t;
    var t_dmg = {};
    c_tdmg.init(t_dmg, t, dmg);
    tis.dmg_recent.push(t_dmg);
    var rlen = t - tis.dmg_recent[0].t;
    if (rlen > conf.recent_len) {
        tis.dmg_recent.shift();
    }
}
c_character.refresh = function(tis, t) {
    var rlen = t - tis.dmg_recent[0].t;
    if (rlen > conf.recent_len) {
        tis.dmg_recent.shift();
    }
}
c_character.get_dpscur = function(tis, t) {
    var tstart = tis.dmg_recent[0].t;
    var dmg = 0;
    var tend = 0;
    var i = null;
    for (i in tis.dmg_recent) {
        dmg += tis.dmg_recent[i].dmg;
    }
    var tend = tis.dmg_recent[i].t;
    console.log(dmg+'/('+tend+'-'+tstart+')'); 
    return dmg/(tend-tstart);
}

c_character.get_dpstotal = function(tis, t) {
    console.log(tis.dmgsum+'/('+tis.tend+'-'+tis.tstart+')'); 
    return tis.dmgsum/(tis.tend -tis.tstart);
}

var c = {};
c_character.init(c, 0);
c_character.add(c, 1, 1);
c_character.add(c, 2.1, 1);
c_character.add(c, 3, 1);
c_character.add(c, 4, 1);
c_character.add(c, 5, 1);
c_character.add(c, 6, 1);
c_character.add(c, 7, 1);
c_character.add(c, 7.5, 1);
c_character.add(c, 7.9, 1);
c_character.add(c, 7.9, 1);

var d = c_character.get_dpscur(c);
var d = c_character.get_dpstotal(c);
console.log(d);

