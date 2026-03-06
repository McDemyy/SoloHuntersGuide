#!/usr/bin/env bash
# setup.sh — One-time Git identity setup for SoloHuntersGuide
# Run this script once on your machine so Git knows who you are.
# Usage: bash setup.sh

echo "====================================="
echo "  SoloHuntersGuide — Git Setup"
echo "====================================="
echo ""
echo "This sets your global Git name and email."
echo "Use the same email address you signed up to GitHub with."
echo ""

read -rp "Your full name  : " GIT_NAME
read -rp "Your GitHub email: " GIT_EMAIL

if [ -z "$GIT_NAME" ] || [ -z "$GIT_EMAIL" ]; then
  echo ""
  echo "ERROR: Name and email cannot be empty. Please run the script again."
  exit 1
fi

git config --global user.name  "$GIT_NAME"
git config --global user.email "$GIT_EMAIL"

echo ""
echo "Done! Git is now configured with:"
echo "  Name : $(git config --global user.name)"
echo "  Email: $(git config --global user.email)"
echo ""
echo "You can now commit and push without errors."
