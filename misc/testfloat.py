import struct
import math

def main():
    b2f(0x41200000)
    f2b(0.0)
    exit()

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
