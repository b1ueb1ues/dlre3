import re
f = open('textlabel.asset')
data = f.read()
#r = re.findall(r'CHARA_NAME_(\d+)\n.*_Text = "(.*)"', data, re.MULTILINE)
charaname = re.findall(r'CHARA_NAME_(\d+)"\n.*_Text = "(.*)"', data, re.MULTILINE)
skillname = re.findall(r'SKILL_NAME_(\d+)"\n.*_Text = "(.*)"', data, re.MULTILINE)
enemyskill = re.findall(r'ENEMY_SKILL.*_(\d+)"\n.*_Text = "(.*)"', data, re.MULTILINE)
print(enemyskill)


