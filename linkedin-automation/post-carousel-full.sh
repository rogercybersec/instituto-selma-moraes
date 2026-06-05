#!/bin/bash
# Full LinkedIn carousel post via agent-browser
# Runs ALL steps in one sequence - no pauses
AB=/usr/local/bin/agent-browser
PDF=~/projects/instituto-selma-moraes/linkedin-automation/carousel-post1.pdf
EMAIL=$(grep LINKEDIN_EMAIL ~/.selma-automation/.env | cut -d= -f2-)
PASS=$(grep LINKEDIN_PASS ~/.selma-automation/.env | cut -d= -f2-)
LOG=/tmp/li-carousel.log

echo "[$(date)] Starting..." > $LOG

# Login
$AB navigate "https://www.linkedin.com/login" >> $LOG 2>&1
sleep 3
REFS=$($AB snapshot -i 2>/dev/null)
E_REF=$(echo "$REFS" | grep 'textbox.*Email\|textbox.*phone' | grep -oP 'ref=\K\w+' | head -1)
P_REF=$(echo "$REFS" | grep 'textbox.*Password' | grep -oP 'ref=\K\w+' | head -1)
$AB type @$E_REF "$EMAIL" >> $LOG 2>&1
$AB type @$P_REF "$PASS" >> $LOG 2>&1
$AB click @$P_REF >> $LOG 2>&1
$AB press Enter >> $LOG 2>&1
echo "[$(date)] Login submitted" >> $LOG
sleep 6

# Open editor via shareActive
$AB navigate "https://www.linkedin.com/feed/?shareActive=true" >> $LOG 2>&1
sleep 4

# Click Mais
REFS2=$($AB snapshot -i 2>/dev/null)
MAIS_REF=$(echo "$REFS2" | grep 'button.*"Mais"' | tail -1 | grep -oP 'ref=\K\w+')
$AB click @$MAIS_REF >> $LOG 2>&1
sleep 2

# Click Adicione um documento
REFS3=$($AB snapshot -i 2>/dev/null)
DOC_REF=$(echo "$REFS3" | grep 'documento' | grep -oP 'ref=\K\w+')
$AB click @$DOC_REF >> $LOG 2>&1
sleep 2

# Upload PDF
REFS4=$($AB snapshot -i 2>/dev/null)
FILE_REF=$(echo "$REFS4" | grep 'Selecionar arquivo' | grep -oP 'ref=\K\w+')
$AB upload @$FILE_REF "$PDF" >> $LOG 2>&1
echo "[$(date)] PDF uploaded" >> $LOG
sleep 3

# Type title and click Concluido
REFS5=$($AB snapshot -i 2>/dev/null)
TITLE_REF=$(echo "$REFS5" | grep 'textbox.*tulo' | grep -oP 'ref=\K\w+')
CONC_REF=$(echo "$REFS5" | grep 'Conclu' | grep -oP 'ref=\K\w+')
$AB type @$TITLE_REF "NR-1 Riscos Psicossociais" >> $LOG 2>&1
sleep 1
# Re-get Concluido ref (might change after typing)
REFS6=$($AB snapshot -i 2>/dev/null)
CONC_REF2=$(echo "$REFS6" | grep 'button.*Conclu' | grep -v disabled | grep -oP 'ref=\K\w+')
$AB click @$CONC_REF2 >> $LOG 2>&1
echo "[$(date)] Document titled and confirmed" >> $LOG
sleep 3

# Type post text
REFS7=$($AB snapshot -i 2>/dev/null)
ED_REF=$(echo "$REFS7" | grep 'textbox.*Editor' | grep -oP 'ref=\K\w+')
$AB type @$ED_REF "546 mil trabalhadores afastados por transtornos mentais em 2025. 67% a mais que em 2014. Deslize e descubra o que a NR-1 exige. Checklist gratuito em selmamoraes.com.br/checklist-nr1 #NR1 #SaudeMental #RiscoPsicossocial #GestaoDePessoas #RH #SST #MetodoResguarda" >> $LOG 2>&1
sleep 2

# Click Publicar
REFS8=$($AB snapshot -i 2>/dev/null)
PUB_REF=$(echo "$REFS8" | grep 'button.*"Publicar"' | grep -v disabled | tail -1 | grep -oP 'ref=\K\w+')
$AB click @$PUB_REF >> $LOG 2>&1
echo "[$(date)] PUBLISHED!" >> $LOG

# Screenshot
$AB screenshot >> $LOG 2>&1
echo "[$(date)] Done" >> $LOG
cat $LOG
