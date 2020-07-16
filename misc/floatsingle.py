import struct 

def f2b(a):
    a = struct.pack('f',a)
    b = struct.unpack('4s',a)
    b = b[0]
    return "0x %02x %02x %02x %02x"%(b[3],b[2],b[1],b[0])

def b2f(a):
    s = [0,0,0,0]
    s[0] = chr(int(a[0:2],16))
    s[1] = chr(int(a[2:4],16))
    s[2] = chr(int(a[4:6],16))
    s[3] = chr(int(a[6:8],16))
    s = "%s%s%s%s"%(s[3],s[2],s[1],s[0])
    a = struct.pack('4s',s)
    b = struct.unpack('f',a)[0]
    return b

def i2f(a):
    a = struct.pack('I',a)
    b = struct.unpack('f',a)[0]
    return b

def tofloat(a):
    return struct.unpack('f', struct.pack('f', a))[0]


if __name__ == '__main__':
    f = i2f(1055706317)
    b = f2b(f)
    print(b)
