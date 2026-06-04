#!/bin/bash
# LinkedIn Auto-Poster for Selma Moraes
# Runs via cron every Tuesday 8am BRT
# Uses agent-browser + real Chrome (not headless)
# Never reposts — picks next unposted from posts.json

LOG="/tmp/linkedin-autopost.log"
DIR="$(cd "$(dirname "$0")" && pwd)"
POSTS="$DIR/posts.json"
AB="/usr/local/bin/agent-browser"

log() { echo "[$(date '+%F %T')] $1" >> "$LOG"; }
log "=== Auto-post started ==="

# Check if agent-browser exists
if [ ! -f "$AB" ]; then
  log "ERROR: agent-browser not found at $AB"
  exit 1
fi

# Find next unposted
NEXT_ID=$(node -e "
const posts=JSON.parse(require('fs').readFileSync('$POSTS','utf8'));
const next=posts.find(p=>!p.posted);
if(next)console.log(next.id);else console.log('DONE');
")

if [ "$NEXT_ID" = "DONE" ]; then
  log "All posts published. Nothing to do."
  exit 0
fi

log "Posting #$NEXT_ID"

# Get post text and comment from JSON
POST_TEXT=$(node -e "
const posts=JSON.parse(require('fs').readFileSync('$POSTS','utf8'));
const p=posts.find(x=>x.id==$NEXT_ID);
console.log(p.text);
")

COMMENT_TEXT=$(node -e "
const posts=JSON.parse(require('fs').readFileSync('$POSTS','utf8'));
const p=posts.find(x=>x.id==$NEXT_ID);
console.log(p.comment||'');
")

# Read credentials from vault
LI_EMAIL=$(grep "LINKEDIN_EMAIL=" ~/.selma-automation/.env | cut -d= -f2-)
LI_PASS=$(grep "LINKEDIN_PASS=" ~/.selma-automation/.env | cut -d= -f2-)

if [ -z "$LI_EMAIL" ] || [ -z "$LI_PASS" ]; then
  log "ERROR: LinkedIn credentials not found in vault"
  exit 1
fi

# Kill existing Chrome and start fresh with debug port
pkill -f "Google Chrome" 2>/dev/null
sleep 2
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 --no-first-run \
  "https://www.linkedin.com/login" &>/dev/null &
sleep 8

# Login
$AB navigate "https://www.linkedin.com/login" 2>/dev/null
sleep 3

# Get field refs and type
REFS=$($AB snapshot -i 2>/dev/null)
EMAIL_REF=$(echo "$REFS" | grep -i 'textbox.*Email\|textbox.*phone' | grep -oP 'ref=\K\w+' | head -1)
PASS_REF=$(echo "$REFS" | grep -i 'textbox.*Password\|textbox.*Wachtwoord' | grep -oP 'ref=\K\w+' | head -1)

if [ -z "$EMAIL_REF" ] || [ -z "$PASS_REF" ]; then
  log "ERROR: Could not find login fields"
  exit 1
fi

$AB type @$EMAIL_REF "$LI_EMAIL" 2>/dev/null
$AB type @$PASS_REF "$LI_PASS" 2>/dev/null
$AB click @$PASS_REF 2>/dev/null
$AB press Enter 2>/dev/null
sleep 8

# Check if logged in
SNAP=$($AB snapshot -i 2>/dev/null)
if echo "$SNAP" | grep -qi "Start a post"; then
  log "Login successful"
else
  log "ERROR: Login failed"
  $AB screenshot 2>/dev/null
  exit 1
fi

# Click Start a post
POST_REF=$(echo "$SNAP" | grep -i 'Start a post' | grep -oP 'ref=\K\w+' | head -1)
$AB click @$POST_REF 2>/dev/null
sleep 3

# Find editor and type
SNAP2=$($AB snapshot -i 2>/dev/null)
EDITOR_REF=$(echo "$SNAP2" | grep -i 'textbox.*Editor\|textbox.*criação' | grep -oP 'ref=\K\w+' | head -1)

if [ -z "$EDITOR_REF" ]; then
  log "ERROR: Editor not found"
  exit 1
fi

$AB type @$EDITOR_REF "$POST_TEXT" 2>/dev/null
sleep 2

# Click Publicar
SNAP3=$($AB snapshot -i 2>/dev/null)
PUB_REF=$(echo "$SNAP3" | grep -i 'button.*Publicar' | grep -v disabled | grep -oP 'ref=\K\w+' | tail -1)

if [ -z "$PUB_REF" ]; then
  log "ERROR: Publicar button not found or disabled"
  exit 1
fi

$AB click @$PUB_REF 2>/dev/null
sleep 5
log "POST #$NEXT_ID PUBLISHED"

# Mark as posted in JSON
node -e "
const fs=require('fs');
const posts=JSON.parse(fs.readFileSync('$POSTS','utf8'));
const p=posts.find(x=>x.id==$NEXT_ID);
p.posted=true;p.postedAt=new Date().toISOString();
fs.writeFileSync('$POSTS',JSON.stringify(posts,null,2));
console.log('Marked #$NEXT_ID as posted');
"

# Screenshot for verification
$AB screenshot 2>/dev/null
log "=== Auto-post complete ==="
