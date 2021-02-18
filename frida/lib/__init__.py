import sys
import frida

def on_message(message, data):
    if message['type'] == 'send':
        msg = message['payload']
        sys.stderr.write("[+] %s\n"%msg)
    elif message['type'] == 'error':
        sys.stderr.write('[-] ---------\n')
        for i in message :
            sys.stderr.write(' -  %s: %s\n'%(i, message[i]))
    else:
        print('[+]'+str(message))

class hfrida() :
    def __init__(this):
        this.script = None
        this.proc_name = None
        this.lib_name = 'null'
        this.jnclude = []
        this.spawn = 0
        this.engine = 'v8'
        this.on_message = on_message
        this.js_body = ''

    def run(this, js_name=None):
        header = 'var __libname__ = "' + this.lib_name + '"\n'
        jnclude = ''
        for i in this.jnclude :
            jnclude += open(i).read()
            jnclude += '\n'

        if not js_name:
            jscode = header + jnclude + this.js_body
            header_len = 0
        else:
            lines = 0
            for i in jnclude:
                if i == '\n':
                    lines +=1
            padding = '\n'*(99 - lines%100)
            header_len = lines + (100 - lines%100)
            jscode = header + jnclude + padding + open(js_name).read()

        f = open('.tmp.js','w')
        f.write(jscode)
        f.close()

        device = frida.get_usb_device()
        if this.spawn:
            pid = device.spawn([this.proc_name])
            process = device.attach(pid)
        else:
            process = device.attach(this.proc_name)
        if this.engine:
            this.script = process.create_script(jscode, runtime=this.engine)
        else:
            this.script = process.create_script(jscode)
        this.script.on('message', this.on_message)
        sys.stderr.write('[+] Running %s (offset+%d)\n'%(js_name, header_len))
        sys.stderr.write('==================================\n')
        this.script.load()
        if this.spawn:
            device.resume(pid)

    def wait(this):
        sys.stdin.read()

