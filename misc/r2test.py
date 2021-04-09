#!/usr/bin/env python3
import r2pipe
import json

'''
aefa [addr] : emulate function to find out args in given or current offset

arcc : Show calling convention defined from the register profile

arr : Show register references (telescoping) // also show args usage
 
axv [addr] : list local variables read-write-exec references

afv= : list function variables and arguments with disasm refs

axff[j] [addr]  find data/code references from this function

pdfs : disassemble function summary
pdsf : Summarize the current function


f : flags

afi [addr|fcn.name] : show function(s) information (verbose afl)
afl[?] [ls*] [fcn name] : list functions (addr, size, bbs, name) (see afll)

'''

class R2(object):
    def __init__(this, fname):
        this.r2 = r2pipe.open(fname)
        this.r2.cmd('aaa')

    def __call__(this, cmd):
        return this.r2.cmd(cmd)

    def j(this, cmd):
        return this.r2.cmdj(cmd)
        #return json.loads(this.r2.cmd(cmd))

    def p(this, cmd):
        r = this.r2.cmd(cmd)
        print(r)
        return r

def digestfcn(fcn, targetfcn):
    print(fcn)
    r2('s '+fcn)
    fj = r2.j('pdfj')
    jj = fj['ops']
    for ii in jj:
        if 'disasm' not in ii:
            continue
        #print('%x'%ii['offset'], ii['disasm'])
        if 'str.' in ii['disasm']: 
            #print('\t', ii['disasm'])
            tmp = r2.j('pdJ 1 @'+ii['disasm'][ii['disasm'].find('str.'):])
            for i3 in tmp:
                loc = i3['text'].find('.string')
                if loc >= 0:
                    sname = i3['text'][loc+1+len('.string'):]
                    print('\t\t', sname)
            #print('\t\t',tmp[2]['text'])
        if '"' in ii['disasm']: 
            print('\t', ii['disasm'])
        if targetfcn in ii['disasm']: 
            print('\t', ii['disasm'])
    print(' ')

#r2 = R2('dlspeed_rt')
r2 = R2('iotrelay')
#r2 = R2('cab_meshd')

#flags = r2.j('fj')
#rflags = {}
#for i in flags:
#    addr = str(i['offset'])
#    name = i['name']
#    print(addr)
#    if addr in rflags:
#        print(rflags)
#        print('!!!!!!!!!dup')
#        exit()
#    rflags[addr] = name
#    print(i)
#exit()
r2('s fcn.0040bb2c')
j = r2.j('pdfj')['ops']
for i in j:
    o = i['offset']
    esil = i['esil'].split(',')
    disasm = i['disasm']
    print('0x%x'%o, disasm, '\n\t', esil)
    if i['type'] == 'call':
        #print(i)
        exit()

