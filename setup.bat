@echo off
REM setup.bat — One-time Git identity setup for SoloHuntersGuide
REM Run this script once on your machine so Git knows who you are.
REM Double-click the file or run it from a Command Prompt.

echo =====================================
echo   SoloHuntersGuide — Git Setup
echo =====================================
echo.
echo This sets your global Git name and email.
echo Use the same email address you signed up to GitHub with.
echo.

set /p GIT_NAME=Your full name  : 
set /p GIT_EMAIL=Your GitHub email: 

if "%GIT_NAME%"=="" (
    echo.
    echo ERROR: Name cannot be empty. Please run the script again.
    pause
    exit /b 1
)
if "%GIT_EMAIL%"=="" (
    echo.
    echo ERROR: Email cannot be empty. Please run the script again.
    pause
    exit /b 1
)

git config --global user.name  "%GIT_NAME%"
git config --global user.email "%GIT_EMAIL%"

echo.
echo Done! Git is now configured with:
git config --global user.name
git config --global user.email
echo.
echo You can now commit and push without errors.
pause
