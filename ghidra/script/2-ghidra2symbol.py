# dump cone to global-metadata
#@b1ueb1ues 
#@category _dl
#@keybinding 
#@menupath 
#@toolbar 

path = getSourceFile()
name = getScriptName()
path = str(path)[:-len(name)]
fw = open(path+'../../working/ghidra.out','w')

listing = currentProgram.getListing()
st = currentProgram.getSymbolTable()

def get(a):
    s_dat = st.getSymbol(a)
    p_dat = s_dat.getAddress()
    disassemble(p_dat)
    c_dat = listing.getCodeUnitAt(p_dat)
    b = str(c_dat)
    fw.write('[%s]\n%s\n\n'%(a,b))
    return b

def finda2b(a, b):
    s_dat = st.getSymbol(b)
    p_dat = s_dat.getAddress()
    disassemble(p_dat)

    for i in range(1000):
        c_dat = listing.getCodeUnitAt(p_dat)
        op = c_dat.getMnemonicString()
        ref = c_dat.getPrimaryReference(0)
        if op == 'bl':
            c_to = listing.getCodeUnitAt(ref.getToAddress())
            label = c_to.getLabel()
            if label == a:
                c = '0x'+str(p_dat.add(4))
                fw.write('[%s][%s]\n%s\n\n'%(a,b,c))
                return c

        p_dat = p_dat.add(4)


finda2b('CharacterBase::get_attack', 'DamageCalculation::CalculationBaseDamage')
finda2b('Random::Range', 'DamageCalculation::CalculationBaseDamage')
finda2b('Random::Range', 'DamageCalculation::Calculation')
finda2b('Random::Range', 'CharacterBuff::ApplyCommon')

get('CollisionHitAttribute::get_DamageAdjustment')
get('CollisionHitAttribute::get_actionId')
get('CollisionHitAttribute::get_characterType')
get('CollisionHitAttribute::get_Owner')
get('CollisionHitAttribute::get_skillId')
