import struct
import math

def main():
    b2f(0x7fffffff)
    b2f(0x3f000000)
    b2f(0x72000002)
    b2f(0x80000000)
    f2b(0.0)
    exit()
    f2b(141.0)
    b2f(0x7f59985b40)
    b2f(0x7f59985480)
    b2f(0x3fc00000)
    b2f(0x3f866666)
    b2f(0x5f6087b)
    b2f(0x013af75)
    b2f(0x3ecccccc)
    b2f(0x3f266666)
    b2f(0x3f000000)
    b2f(0x3e19999a)
    b2f(0x3f933333)
    b2f(0x3fd9999a)
    b2f(0x3f99999a)
    b2f(0x3f19999a) #damageadjust
    b2f(0x3e99999a)
    b2f(0xbf800000)
    b2f(0x3dcccccd)
    b2f(0x3fa66666)
    b2f(0x3e99999a)
    b2f(0x4b31ae10)
    b2f(0x7eb89630)
    print('---------------')
    f2b(0.7)
    f2b(1.7)
    f2b(5/3.0)
    f2b(0.5)
    f2b(1.15)
    f2b(1.0)

def f2b(a):
    a = struct.pack('f',a)
    b = struct.unpack('I',a)[0]
    print("0x%x"%(b));
    #b = struct.unpack('4s',a)[0]
    #print("0x%02x%02x%02x%02x"%(b[3],b[2],b[1],b[0]))

def b2f(a):
    a = struct.pack('I',a);
    b = struct.unpack('f',a)[0]
    print(b)


def d2b(a):
    a = struct.pack('d',a)
    b = struct.unpack('Q',a)[0]
    print("0x%x"%b)


def b2d(a):
    a = struct.pack('Q',s)
    b = struct.unpack('d',a)[0]
    print(b)


main()
