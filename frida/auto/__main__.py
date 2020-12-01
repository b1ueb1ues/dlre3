import re


path_py = '../working/script.py'
path_cs = '../working/dump.cs'
path_gh = '../working/ghidra.out'
path_out = 'auto/symbol.js'
path_template = 'jnclude/template.js'
path_tlin = 'auto/textlabel.asset'
path_tlout = 'auto/tl.py'

functions = []
classes = {}
ghs = []
def js_symbol():
    global classes
    global functions
    global ghis
    get_functions(path_py)
    get_classes(path_cs)
    get_ghidra(path_gh)

    fout = open(path_out,'w')
    for line in open(path_template):
        if '#' in line:
            lout = func(line)
        elif '@' in line:
            lout = var(line)
        elif '%s' in line:
            lout = ghidra(line)
        else:
            lout = line
        print(lout.strip())
        fout.write(lout)
    fout.close()

def get_classes(path_cs):
    global classes
    state = 0 # none
    for i in open(path_cs,'rb'):
        i = i.decode()
        if state == 0:
            if ' class ' in i or i[:6]=='class ':
                state = 1
                s = i.find('class')+6
                c = i[s:]
                e = c.find(' ')
                c = c[:e]
                classes[c] = []
        elif state == 1:
            if ')' in i or '}' in i:
                state = 0
                continue
            if 'RVA:' in i:
                continue
            tmp = i.split('//')
            if len(tmp) >= 2 :
                name = tmp[0].strip()
                addr = tmp[1].strip()
                if name != '':
                    nameaddr = (name, addr)
                    #print(nameaddr)
                    classes[c].append(nameaddr)
    return classes

def get_functions(path_py):
    global functions
    for i in open(path_py, 'rb'):
        i = i.decode()
        if i[:10] != 'SetMethod(':
            continue
        end = i.find("')")
        i = i[10:end]
        an = i.strip().split(', \'')
        addr = an[0]
        name = an[1].strip()
        functions.append((name, addr))
    return functions

def get_ghidra(path_gh):
    global ghs
    for i in open(path_gh, 'rb'):
        i = i.decode()
        if i.find('0x') == 0 :
            ghs.append(i.strip())
        elif i.find('ldr') == 0 :
            s = i.find('#')+1
            e = i.rfind(']')
            ghs.append(i[s:e])

def ghidra(line):
    lout = line.replace('%s', ghs.pop(0))
    return lout

def func(line):
    global functions
    part = line.split('#')
    symbol = part[1].split(',')
    if len(symbol) == 1:
        name = symbol[0].strip()
        idx = 1
    elif len(symbol) == 2:
        name = symbol[0].strip()
        idx = int(symbol[1])
    else:
        raise
    for i in functions:
        if i[0] == name:
            idx -= 1
            if not idx:
                lout = line.replace('#%s#'%part[1], i[1])
    if idx > 0 :
        raise # not found
    return lout

def var(line):
    global classes
    part = line.split('@')
    symbol = part[1].split(',')
    if len(symbol) == 2:
        classname = symbol[0].strip()
        varname = symbol[1].strip()
    else:
        raise
    for i in classes[classname]:
        if varname in i[0]:
            lout = line.replace('@%s@'%part[1], i[1])
            break
    return lout

skillname = {}
charaname = {}
enemyskill = {}
abilityname = {}

def get_py_symbol():
    global skillname, charaname, enemyskill, abilityname
    try:
        f = open(path_tlin,'rb')
    except Exception as e:
        print('\n[+] no textlabel update')
        return 0;
    data = f.read().decode()
    tmp = re.findall(r'CHARA_NAME_(\d+)".\n.*_Text = "(.*)"', data)
    for i in tmp:
        charaname[i[0]] = i[1]
    tmp = re.findall(r'CHARA_NAME_COMMENT_(\d+)".\n.*_Text = "(.*)"', data)
    for i in tmp:
        charaname[i[0]] = i[1].replace(' ','') \
                .replace('（','(') \
                .replace('）',')') \
                .replace('Ver.','') \
                .replace('限定','') \
                .replace(' ','')
    tmp = re.findall(r'DRAGON_NAME_(\d+)".\n.*_Text = "(.*)"', data)
    for i in tmp:
        charaname[i[0]] = i[1]
    tmp = re.findall(r'DRAGON_NAME_COMMENT_(\d+)".\n.*_Text = "(.*)"', data)
    for i in tmp:
        charaname[i[0]] = i[1].replace(' ','') \
                .replace('（','(') \
                .replace('）',')') \
                .replace('Ver.','') \
                .replace('限定','') \
                .replace(' ','')

    tmp = re.findall(r'SKILL_NAME_(\d+)".\n.*_Text = "(.*)"', data)
    for i in tmp:
        skillname[i[0]] = i[1]
    tmp = re.findall(r'ABILITY_NAME_(\d+)".\n.*_Text = "(.*)"', data)
    for i in tmp:
        abilityname[i[0]] = i[1].replace('{ability_val0}', '?')
    tmp = re.findall(r'ENEMY_SKILL.*_(\d+)".\n.*_Text = "(.*)"', data)
    for i in tmp:
        enemyskill[i[0]] = i[1]
    f.close()
    return 1

def save_py_symbol() :
    global skillname, charaname, enemyskill, abilityname
    fout = open(path_tlout, 'w')
    fout.write('skillname = %s\n'%str(skillname))
    fout.write('charaname = %s\n'%str(charaname))
    fout.write('enemyskill = %s\n'%str(enemyskill))
    fout.write('abilityname = %s\n'%str(abilityname))
    fout.close()
    print('\n[+] save', path_tlout)


if __name__ == '__main__':
    js_symbol()
    if get_py_symbol():
        save_py_symbol()
