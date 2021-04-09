import math
n = 100

cc_addi = 0
cd_addi = 0.6

class Crit(object):
    # const {
    __cc_base = 0.05
    __cd_base = 0.5
    __atk_r = 1.5
    __cc_r = 1
    __cd_r = 2
    # }
    def __init__(this, cc_addi=0, cd_addi=0):
        this.cc_addi = cc_addi
        this.cd_addi = cd_addi
        this._cc = this.__cc_base + cc_addi
        this._cd = this.__cd_base + cd_addi
        return

    def reset(this):
        this._cc = this.__cc_base + this.cc_addi
        this._cd = this.__cd_base + this.cd_addi
        return

    def v_c_base(this):
        c1 = this.__cc_base
        c2 = this.cc_addi
        d1 = this.__cd_base
        d2 = this.cd_addi
        return (c1 + c2)*(d1 + d2) + 1
    
    def v_c_curr(this):
        cc = this.cc()
        cd = this.cd()
        return cc*cd + 1

    def cc(this):
        if this._cc < 1 :
            if this._cc > 0 :
                return this._cc
            else :
                return 0
        else :
            return 1

    def cd(this):
        return this._cd
    
    def sim_add_cc_to(this, target):
        cc = this.cc()
        if cc >= 1:
            return 0
        else:
            if target > 1:
                raise
            if target < cc:
                raise
            else:
                r = target - this._cc
                return r

    def c_best(this, n) :
        while 1:
            if this.cd()/this.__cd_r > this.cc()/this.__cc_r:
                #need cc first
                cc_bottom = this.cd()/this.__cd_r*this.__cc_r
                tmp = this.sim_add_cc_to(cc_bottom) / this.__cc_r
                if tmp > n:
                    this._cc += n * this.__cc_r
                    n = 0
                    break
                else:
                    this._cc += tmp * this.__cc_r
                    n -= tmp

                    n_split = n/2
                    cc = this.cc() + n_split * this.__cc_r
                    if cc > 1:
                        n -= (1 - this._cc)/this.__cc_r
                        this._cc = 1
                        this._cd += n * this.__cd_r
                        n = 0
                    else:
                        this._cc += n_split * this.__cc_r
                        this._cd += n_split * this.__cd_r
                        n = 0
                    break
            else:
                raise
            break
        r = (this.cc(), this.cd())
        #print(r)
        #this.reset()
        return r

#c = Crit()
#print("n, cur, n, avg")
#for i in range(1, 200):
#    c.reset()
#    cc, cd = c.c_best(i/100)
#    avg = (c.v_c_curr() / c.v_c_base() - 1) / i
#    #print("%s, %.4f, %.4f"%(i, cc, cd))
#    #print("%s, %.3f, %s, %.3f"%(i, c.v_c_curr(), i, avg*1000))
#    print("%s, %.3f"%(i, math.log(avg*1000)))



c = Crit(cc_addi, cd_addi)
g_out = {}
for t in range(1, 10):
    total = t*50
    out = []
    g_out[total] = out
    for i in range(1, total):
        c.reset()
        cc, cd = c.c_best(i/100)
        atk = 1 + (total - i) / 100 * 1.5
        dmg = (cc * cd + 1) * atk
        out.append(dmg)

headline = 'ccd_consume'
for i in range(1, total):
    headline += ',%d'%i

dataline = ''
for i in g_out:
    tmp = 'total:%d'%i
    for j in g_out[i]:
        tmp += ',%.2f'%j
    dataline += tmp + '\n'

print(headline)
print(dataline)

