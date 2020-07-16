import sys
import frida

script = None;

def _on_message(message, data):
    global script
    if message['type'] == 'send':
        msg = message['payload']
        if data == b'stderr':
            sys.stderr.write("[+] {0}\n".format(msg))
        elif data == b'print':
            sys.stdout.write(msg+'\n')
            script.post({'type':'ack'})
        else:
            sys.stdout.write("[+] {0}\n".format(msg))
    elif message['type'] == 'error':
        print('[+]')
        for i in message :
            print('- '+i+':')
            print(message[i])
    else:
        print('[+]'+str(message))


def run(js_name, conf, on_message=_on_message):
    global script

    proc_name = conf.proc_name
    lib_name = conf.lib_name

    jnclude = ''
    for i in conf.jnclude :
        jnclude += open(i).read()
        jnclude += '\n'

    lines = 0
    for i in jnclude:
        if i == '\n':
            lines +=1

    header = 'var __libname__ = "' + lib_name + '"\n'
    padding = '\n'*(99 - lines%100)
    header_len = lines + (100 - lines%100)

    jscode = header + jnclude + padding + open(js_name).read()
    f = open('.tmp.js','w')
    f.write(jscode)
    f.close()

    device = frida.get_usb_device()
    if conf.spawn:
        pid = device.spawn([proc_name])
        process = device.attach(pid)
    else:
        process = device.attach(proc_name)
    if 'engine' in vars(conf):
        script = process.create_script(jscode, runtime=conf.engine)
    else:
        script = process.create_script(jscode)
    script.on('message', on_message)
    sys.stderr.write('[+] Running %s (offset+%d)\n'%(js_name, header_len))
    sys.stderr.write('==================================\n')
    script.load()
    if conf.spawn:
        device.resume(pid)

