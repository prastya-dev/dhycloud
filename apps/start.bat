@echo off
echo Starting DhyCloud...

start "Backend" cmd /k "cd /d %~dp0api && node ."
start "Frontend" cmd /k "cd /d %~dp0frontend && npx next start -H 0.0.0.0"

echo Both servers started!