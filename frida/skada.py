#!/usr/bin/env python3
# -*- encoding: utf8
# config ####################
DPSRANGE = 5
ENGINE = 'details.js'
#############################
from lib import hfrida
import sys, os, re, time
from auto.tl import skillname, charaname, enemyskill, abilityname

f = hfrida()
f.proc_name = 'com.nintendo.zaga'
f.lib_name = 'libil2cpp.so'
f.engine = 'v8'
f.spawn = False
f.jnclude = ['lib/bin.js', 'auto/symbol.js', 'jnclude/utils.js', 'jnclude/gl.js', 'jnclude/savetheday.js']

t0 = 0
fout = None
fpname = ''
foutname = None
redir = 0
if os.name == 'nt':
    iswin = 1
else:
    iswin = 0

def ctrlp(n):
    if n > 0:
        sys.stderr.write('\x1b[1A\x1b[2K'*n)

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
            #return '0'
            return '%d'%this.sum
        return '%d'%(this.sum / this.dt)

    def dmg_sum(this):
        if this.dt <= 0:
            #return '0'
            return '%d'%this.sum
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
        this.name_dps = this.name_dps_vertical

    def add(this, timenow, idx, dmg, name=''):
        if idx not in this.member:
            this.midx.append(idx)
            this.member[idx] = Ds(name, timenow)
        this.member[idx].add(timenow, dmg, name)
        #for i in this.member.values():
        #    i.refresh(timenow)
        this.dt = timenow - this.t1
        this.tn = timenow

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

    def name_dps_horizon(this):
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

    def name_dps_vertical(this):
        ret = ''
        tmp = this.midx[:]
        tmp.sort()
        for i in tmp:
            if i != -2:
                m = this.member[i]
                #ret += '\t%s: %s\n'%(m.name, m.dps_total())
                dps = m.dps_total()
                dps += ' ' * (10 - len(dps))
                ret += '\t%s: %s\n'%(dps, m.name)
        if -2 in tmp:
            #ret += '\tdot: '+this.member[-2].dps_total() + '\n'
            dps = this.member[-2].dps_total()
            dps += ' ' * (10 - len(dps))
            ret += '\t%s: dot\n'%(dps)
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

    tmp = 'timestamp,hook,[,ctype,team,player,inplayer,],src, dst,<actionid>,<skillid>,->,log_type,dmg'
    tmp += ',-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-,-\n'
    if fout:
        fwrite(fout, tmp)
    if redir:
        sys.stdout.write(tmp)


def fwrite(f, string):
    f.write(string.encode('utf8'))


fsum = None
teams = {}
def summ():
    global teams, foutname, fsum, prev_len
    if teams == {}:
        return 0
    prev_len = 0
    ssum = ''
    for i in teams:
        dstid, tmp = i.split(':')
        dsttype = tmp[1]
        if dsttype != 'e':
            continue
        teamid, dstid = dstid.split('->')
        t = teams[i]
        t_start = t.t1
        duration = t.dt
        t_end = t_start + duration
        name_dps, dmg_sum = t.name_dps_horizon()
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
        s2 = '\n[+] summary: '+ str(foutname) +'\n' + ssum
    else:
        s2 = '\n[+] summary: stdout\n' + ssum

    if not fsum:
        fsum = open('.skada.log', 'ab')
    fwrite(fsum, s2)

    teams = {}
    return ssum


def csv(*args, **kwargs):
    r = ''
    for i in args:
        r += '"%s",'%i
    return r[:-1]

prev_len = 0
def skada(msg):
    global teams
    global skillname, charaname, enemyskill, abilityname
    global fout
    global prev_len

    # common
    tn = float(msg['ts'])
    dmg = msg['dmg']
    actionid = str(msg['aid'])
    skillid = str(msg['sid'])

    # src
    src = msg['from']
    srcid = str(src['cid'])
    srctype = src['ctype']
    srcteam = str(src['team'])
    srcinteam = str(src['inteam'])

    if srctype == 'e':
        cname = ''
    elif srcid == '-1':
        cname = 'dot'
    elif srcid in charaname:
        cname = charaname[srcid]
    else:
        cname = '_unknown_'

    teamno = srctype + srcteam
    player = str(src['player'])
    inteamno = player+srcinteam

    # dst
    dst = msg['to']
    dstid = str(dst['cid'])
    to = "->%s:[%s|%s.%s.%s.%s]"%(dst['cid'], dst['ctype'],
            dst['team'],dst['inteam'],dst['player'],dst['inplayer'])
    dsttype = dst['ctype']

    # count
    teamdst = teamno+to
    if player == '-2':
        idx = '-2'
    elif player == '-1':
        idx = srcinteam
    else:
        idx = inteamno

    if teamdst not in teams:
        teams[teamdst] = Team(tn)

    t = teams[teamdst]
    if srcid != '-2': #buff
        t.add(tn, idx, dmg, cname)

    event = cname + '->'
    if dstid in charaname:
        event += ' '+charaname[dstid]
    if skillid in skillname:
        event += ' '+skillname[skillid]
    if skillid in abilityname:
        event += ' '+abilityname[skillid]
    if actionid in enemyskill:
        event += ' '+enemyskill[actionid]

    tmp = ','
    tmp += cname+':'

    timing = t.timing()
    cur = t.dps_current()
    total = t.dps_total()
    _sum = t.dmg_sum()
    dps_src = t.dps_src()

    tmp += timing
    tmp += _sum
    tmp += cur
    tmp += total
    tmp += dps_src

    teaminteamno = ''
    teaminteamno += ',team['+teamno+']:{'
    for k in t.midx:
        teaminteamno += k + ' '
    teaminteamno = teaminteamno[:-1] + '}'
    
    tmp += teaminteamno

    #tmp = 'timestamp,hook,[,pve,t,p,idx,],src, dst,<actionid>,<skillid>,->,dmg_type,dmg'
    p = csv(tn, msg['hook'], '[', srctype, srcteam, player, srcinteam, ']',
            srcid, to, '<%s>'%actionid, '<%s>'%skillid , event ,msg['dtype'], dmg, '//', msg['comment'] )
    if fout:
        p += tmp + '\n'
        fwrite(fout, p)
    elif redir:
        p += tmp + '\r\n'
        sys.stdout.write(p)
    #debug{
    if srctype == 'p' and dsttype=='e':
        if iswin :   # horizon
            name_dps, dmg = t.name_dps_horizon()
            output = '\r%.3f, id:%s->%s, dps:[ %s ]'%(t.tn, teamno, dstid, name_dps)
            output_len = len(output)
            if output_len >= prev_len:
                sys.stderr.write(output)
            else:
                space = '  ' * (prev_len - output_len)
                sys.stderr.write(output + space)
            prev_len = output_len
        elif redir:
            pass
        else:  # vertical
            ctrlp(prev_len)
            name_dps, dmg = t.name_dps_vertical()
            #sys.stderr.write('%.3f, dps(%s->%s):[ %s ]\n'%(t.tn, teamno, dstid, name_dps))
            out = '%.3f, id:%s->%s, dps:[\n%s]\n'%(t.tn, teamno, dstid, name_dps)
            prev_len = 0
            for i in out:
                if i == '\n':
                    prev_len += 1
            sys.stderr.write(out)
    #}debug

disable = 0
def on_message(message, data):
    global t0
    global fout
    global disable, prev_len
    if message['type'] == 'send' :
        msg = message['payload']
        hook = msg['hook']
        if hook == 'init':
            disable = -1
            t0 = float(msg['t0'])
            return
        elif hook == 'start':
            summ()
            disable = -1
            t0 = 0
            return
        else:
            if disable == 0:
                skada(msg)
                return
            elif disable == -1:
                foutopen()
                disable = 0
                skada(msg)
            return
    elif message['type'] == 'error' :
        sys.stderr.write('[-] ---------\n')
        for i in message :
            sys.stderr.write(' -  %s: %s\n'%(i, message[i]))
    else:
        print(message)



if __name__ == '__main__':
    import os
    if len(sys.argv) > 1:
        fpname = sys.argv[1]
        if fpname in ['0', '/dev/null', 'null']:
            fpname = None
        elif '/' not in fpname :
            fpname = 'recount/'+fpname
    else:
        fpname = None
        redir = 1
    f.on_message = on_message
    f.run(ENGINE)

    try:
        while 1:
            input()
            summ()
            disable = 1
            if fout:
                fout.close()
                sys.stderr.write('[+] fclose\n')
            fout = None
            #foutopen()
    except KeyboardInterrupt as e:
        summ()
        #sys.stderr.write(e)
        exit()


