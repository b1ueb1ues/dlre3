#!python3
# -*- encoding: utf8
# config ####################
DPSRANGE = 5
#ENGINE = 'skada.js'
ENGINE = 'details.js'

#############################
import lib
import time
import sys
import re
import conf
from common.tl import skillname, charaname, enemyskill, abilityname

t0 = 0
fout = None
fpname = ''
foutname = None

class Nilds(object):
    def dps_total(this):
        return 0
    def dps_current(this):
        return 0

class Ds(object):
    global DPSRANGE
    dpsrange = DPSRANGE
    def __init__(this, name, t1):
        this.name = name
        this.sum = 0
        this.cur = 0
        this.timedmg = [(0,0)]
        this.t1 = t1
        this.dt = 0

    def add(this, timenow ,dmg, name):
        this.name = name
        this.sum += dmg
        this.cur += dmg
        this.dt = timenow - this.t1
        this.timedmg.append((this.dt, dmg))
        #while this.timedmg[0][0] < this.dt-this.dpsrange:
        #    this.cur -= this.timedmg.pop(0)[1]

    def refresh(this, timenow):
        dt = timenow - this.t1
        this.timedmg.append((dt, 0))
        while this.timedmg[0][0] < dt-this.dpsrange:
            this.cur -= this.timedmg.pop(0)[1]
        #this.dt = dt  # this to make dps drop after dead

    def dps_total(this):
        if this.dt <= 0:
            return '0'
        return '%d'%(this.sum / this.dt)

    def dmg_sum(this):
        if this.dt <= 0:
            return '0'
        return '%d'%(this.sum)

    def dps_current(this):
        return '%d'%(this.cur/this.dpsrange)

class Team(object):
    def __init__(this, tn=None):
        global t0
        this.t0 = t0
        if tn:
            this.t1 = tn
        else:
            this.t1 = t0
        this.member = {}
        this.midx = []
        this.dt = 0;

    def add(this, timenow, idx, dmg, name=''):
        if idx not in this.member:
            this.midx.append(idx)
            this.member[idx] = Ds(name, timenow)
        this.member[idx].add(timenow, dmg, name)
        #for i in this.member.values():
        #    i.refresh(timenow)
        this.dt = timenow - this.t1
        this.tn = timenow - this.t0

    def dps_total(this):
        ret = ',dps_total:{'
        n = 5
        for i in this.midx:
            n -= 1
            ret += ','+this.member[i].dps_total()
        while n:
            n -= 1
            ret += ',0'
        ret += ',}'
        return ret

    def timing(this):
        return ',t:{,%.3f,}'%(this.dt)

    def dmg_sum(this):
        ret = ',dmg_sum:{'
        n = 5
        for i in this.midx:
            n -= 1
            ret += ','+this.member[i].dmg_sum()
        while n:
            n -= 1
            ret += ',0'
        ret += ',}'
        return ret


    def dps_current(this):
        ret = ',dps_cur:{'
        n = 5
        for i in this.midx:
            n -= 1
            ret += ','+this.member[i].dps_current()
        while n:
            n -= 1
            ret += ',0'
        ret += ',}'
        return ret
    
    def dps_src(this):
        ret = ',['
        for i in this.midx:
            ret += this.member[i].name + ' '
        ret = ret[:-1] + ']'
        return ret

    def name_dps(this):
        ret = ''
        tmp = this.midx[:]
        tmp.sort()
        for i in tmp:
            if i != -2:
                m = this.member[i]
                ret += '%s:%s  '%(m.name, m.dps_total())
        if -2 in tmp:
            ret += 'dot:'+this.member[-2].dps_total()
        else:
            ret = ret[:-2]
        ret2 = ''
        for i in tmp:
            if i != -2:
                m = this.member[i]
                ret2 += '%s '%(m.dmg_sum())
        if -2 in tmp:
            ret2 += this.member[-2].dmg_sum()
        else:
            ret2 = ret2[:-1]
        return ret, ret2


def foutopen():
    global fout, fpname, foutname, teams
    if fpname:
        fbasename, ext = os.path.splitext(fpname)
        if not ext or ext=='':
            ext = '.csv'
        count = 1
        fname = fbasename + '.0'
        while os.path.exists(fname+ext):
            fname = fbasename + '.%s'%count
            count += 1
        fout = open(fname+ext, 'wb')
        foutname = fname+ext
    else:
        fout = None
    teams = {}


def fwrite(f, string):
    f.write(string.encode('utf8'))

teams = {}
def summ():
    global teams, foutname
    if teams == {}:
        return 0
    ssum = ''
    for i in teams:
        dstid, tmp = i.split(':')
        dsttype = tmp[1]
        if dsttype != '1':
            continue
        teamid, dstid = dstid.split('->')
        t = teams[i]
        t_end = t.tn
        t_start = t.t1
        duration = t_end - t_start
        name_dps, dmg_sum = t.name_dps()
        ssum += 'dst:%s  team:%s  t:[%.2fs->%.2fs]  dmg:[%s]\n'%(dstid, teamid, t_start, t_end, dmg_sum)
        ssum += '\tdps: [ %s ] %.2fs\n'%(name_dps, duration)
        #ssum += 'dst:%s  team:%s  t:[%.2fs->%.2fs] %.2fs\n'%(dstid, teamid, t_start, t_end, duration)
        #ssum += '\tdmg: [ %s ]\n'%(dmg_sum)
        #ssum += '\tdps: [ %s ]\n'%(name_dps)
        ssum += '\n'

    s1 = '\n[+] summary:\n' + ssum
    sys.stderr.write(s1)
    if fout:
        fwrite(fout, '-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,"%s"'%s1)

    s2 = '\n[+] summary: '+ foutname +'\n' + ssum
    fsum = open('.skada.log', 'ab')
    fwrite(fsum, s2)
    fsum.close()

    teams = {}
    return ssum

def on_message(message, data):
    global teams
    global t0
    global skillname, charaname, enemyskill, abilityname
    global fout
    if message['type'] == 'send' :
        if data == '1' or data == b'1':
            t0 = float(message['payload'])
            return
        if data == '0' or data == b'0':
            if fout:
                summ()
            foutopen()
            if fout:
                fwrite(fout, message['payload']+'\n')
            else:
                print(message['payload'])
            return
        if data == 'stderr' or data == b'stderr':
            sys.stderr.write("[*] {0}\n".format(message['payload']))
            return
        #p = "{0}".format(message['payload'])
        p = message['payload']
        line = p.split(',')
        tn = float(line[0])
        srcid = line[2].split('(')[0].strip()

        if srcid == '-1':
            cname = 'dot'
        elif srcid in charaname:
            cname = charaname[srcid]
        else:
            cname = '_unknown_'

        dmg = int(line[-3])
        teamno = line[4]+line[5]
        dst = line[10]
        dstid, dstinid = dst[2:].split(':')
        dsttype = dstinid[1]
        teamdst = teamno+dst
        actionid = line[11][1:-1]
        skillid = line[12][1:-1]

        inteamno = line[7]+line[6]
        if line[7] == '-2':
            idx = -2
        elif line[7] == '-1':
            idx = int(line[6])
        else:
            idx = int(inteamno)
        #    if idx < -9:
        #        idx = -10 - idx

        #dp = line[5]+line[6]+line[7]+line[8]
        if teamdst not in teams:
            teams[teamdst] = Team(tn)

        t = teams[teamdst]
        if srcid != '-2': #buff
            t.add(tn, idx, dmg, cname)

        tmp = ','
        tmp += cname+'->'
        if dstid in charaname:
            tmp += ' '+charaname[dstid]
        if skillid in skillname:
            tmp += ' '+skillname[skillid]
        if skillid in abilityname:
            tmp += ' '+abilityname[skillid]
        if actionid in enemyskill:
            tmp += ' '+enemyskill[actionid]

        timing = t.timing()
        cur = t.dps_current()
        total = t.dps_total()
        _sum = t.dmg_sum()
        src = t.dps_src()

        tmp += timing
        tmp += _sum
        tmp += cur
        tmp += total
        tmp += src

        teaminteamno = ''
        teaminteamno += ',team['+teamno+']:{'
        for k in t.midx:
            teaminteamno += '%02d '%(k)
        teaminteamno = teaminteamno[:-1] + '}'
        
        tmp += teaminteamno

        p += tmp + '\n'
        if fout:
            fwrite(fout, p)
        else:
            sys.stdout.write(p)
        #debug{
        if line[4] == '0' and dsttype=='1':
            #sys.stderr.write(timing[1:]+',dst:'+dstid+teaminteamno+src+total+_sum+'\n')
            name_dps, dmg = t.name_dps()
            sys.stderr.write('%.3f, dps(%s->%s):[ %s ]\n'%(t.tn, teamno, dstid, name_dps))
        #}debug
    else:
        print(message)



if __name__ == '__main__':
    import os
    if len(sys.argv) > 1:
        fpname = sys.argv[1]
        if '/' not in fpname :
            fpname = 'recount/'+fpname
    else:
        fpname = None

    foutopen()
    lib.run(ENGINE, conf, on_message)
    try:
        while 1:
            input()
            summ()
            if fout:
                fout.close()
                sys.stderr.write('[+] fclose\n')
            fout = None
            #foutopen()
    except KeyboardInterrupt as e:
        if fout:
            s = summ()
        #sys.stderr.write(e)
        exit()


