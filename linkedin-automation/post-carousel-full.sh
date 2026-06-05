#!/bin/bash
AB=/usr/local/bin/agent-browser
PDF=~/projects/instituto-selma-moraes/linkedin-automation/carousel-post1.pdf
EMAIL=$(grep LINKEDIN_EMAIL ~/.selma-automation/.env | cut -d= -f2-)
PASS=$(grep LINKEDIN_PASS ~/.selma-automation/.env | cut -d= -f2-)

getref() { echo "$1" | grep "$2" | sed 's/.*ref=\([a-z0-9]*\).*/\1/' | head -1; }

echo "1. Login..."
$AB navigate "https://www.linkedin.com/login" 2>/dev/null
sleep 3
S=$($AB snapshot -i 2>/dev/null)
ER=$(getref "$S" "Email\|phone")
PR=$(getref "$S" "Password")
echo "   email=$ER pass=$PR"
$AB type @$ER "$EMAIL" 2>/dev/null
$AB type @$PR "$PASS" 2>/dev/null
$AB click @$PR 2>/dev/null
$AB press Enter 2>/dev/null
sleep 8

echo "2. Open editor..."
$AB navigate "https://www.linkedin.com/feed/?shareActive=true" 2>/dev/null
sleep 4
S=$($AB snapshot -i 2>/dev/null)
echo "   Has editor: $(echo "$S" | grep -c "Editor")"

echo "3. Click Mais..."
MR=$(echo "$S" | grep 'button "Mais"' | tail -1 | sed 's/.*ref=\([a-z0-9]*\).*/\1/')
echo "   Mais ref=$MR"
$AB click @$MR 2>/dev/null
sleep 2

echo "4. Click Documento..."
S=$($AB snapshot -i 2>/dev/null)
DR=$(getref "$S" "documento")
echo "   Doc ref=$DR"
$AB click @$DR 2>/dev/null
sleep 2

echo "5. Upload PDF..."
S=$($AB snapshot -i 2>/dev/null)
FR=$(getref "$S" "Selecionar arquivo\|file")
echo "   File ref=$FR"
$AB upload @$FR "$PDF" 2>/dev/null
sleep 4

echo "6. Title + Concluido..."
S=$($AB snapshot -i 2>/dev/null)
TR=$(getref "$S" "tulo")
echo "   Title ref=$TR"
$AB type @$TR "NR-1 Riscos Psicossociais" 2>/dev/null
sleep 1
S=$($AB snapshot -i 2>/dev/null)
CR=$(echo "$S" | grep "Conclu" | grep -v disabled | sed 's/.*ref=\([a-z0-9]*\).*/\1/' | head -1)
echo "   Concluido ref=$CR"
$AB click @$CR 2>/dev/null
sleep 3

echo "7. Type text..."
S=$($AB snapshot -i 2>/dev/null)
ER2=$(getref "$S" "Editor.*conteúdo\|Editor.*conte")
echo "   Editor ref=$ER2"
$AB type @$ER2 "546 mil trabalhadores afastados por transtornos mentais em 2025. 67% a mais que em 2014. Deslize e descubra o que a NR-1 exige. Checklist gratuito em selmamoraes.com.br/checklist-nr1 #NR1 #SaudeMental #RiscoPsicossocial #GestaoDePessoas #RH #SST #MetodoResguarda" 2>/dev/null
sleep 2

echo "8. Publicar!"
S=$($AB snapshot -i 2>/dev/null)
PB=$(echo "$S" | grep '"Publicar"' | grep -v disabled | tail -1 | sed 's/.*ref=\([a-z0-9]*\).*/\1/')
echo "   Publicar ref=$PB"
$AB click @$PB 2>/dev/null
sleep 3

echo "9. Screenshot..."
$AB screenshot 2>/dev/null
echo "DONE"
