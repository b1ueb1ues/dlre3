# dump cone to global-metadata
#@b1ueb1ues 
#@category _dl
#@keybinding 
#@menupath 
#@toolbar 

path = getSourceFile()
name = getScriptName()
path = str(path)[:-len(name)]
fw = open(path+'../../working/global-metadata.dat','wb')

listing = currentProgram.getListing()
st = currentProgram.getSymbolTable()

s_dat = st.getSymbol('coneshell_global_metadata_dat')
s_len = st.getSymbol('coneshell_global_metadata_dat_len')
p_dat = s_dat.getAddress()
p_len = s_len.getAddress()

c_dat = listing.getCodeUnitAt(p_dat)
cone = c_dat.getBytes()
for i in cone:
    #if i < 0:
    #    i += 256
    #b = int(i)
    b = ~i & 0xFF
    fw.write(chr(b))
fw.close()

