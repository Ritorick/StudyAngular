@echo off

call npx tsc
if errorlevel 1 (
    echo TypeScript compilation failed.
    pause
    exit /b 1
)

node dist/main.js