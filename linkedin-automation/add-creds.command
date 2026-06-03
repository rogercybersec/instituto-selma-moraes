#!/bin/bash
# Double-click this file to add LinkedIn credentials to the vault
echo "Adding LinkedIn credentials to vault..."
read -p "LinkedIn email: " email
read -sp "LinkedIn password: " pass
echo ""
echo "LINKEDIN_EMAIL=$email" >> ~/.selma-automation/.env
echo "LINKEDIN_PASS=$pass" >> ~/.selma-automation/.env
echo "Done! You can close this window."
