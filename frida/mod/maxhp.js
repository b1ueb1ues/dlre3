
hook(
offset.characterbase.get_maxhp
,{
    onEnter: function(args){
    },
    onLeave: function(retval){
        console.log('get_maxhp: '+retval.toInt32());
    }
});

//hook(
//0x131C374
//,{
//    onEnter: function(args){
//        console.log('get_currShp');
//    },
//    onLeave: function(retval){
//        console.log('calc_sheild '+retval.toInt32());
//    }
//})

/*
 * 
20: 286348
21: 306096
22: 325845
23: 345593
24: 387064
25: 428535 
26: 470006
27: 511477
28: 552948
29: 559584
30: 566219
31: 572855
32: 579490
33: 586125
34: 591987
35: 597848
36: 603709
37: 609570
38: 615432
39: 620355
40: 625279

 *
 * */
