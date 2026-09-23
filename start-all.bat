@echo off
echo =======================================================
echo  Starting foliolysis — Algorithmic Trading & Risk Simulator
echo =======================================================
start "Analytics Service (Port 8000)" cmd /k "cd /d %~dp0analytics && .\venv\Scripts\uvicorn main:app --host 0.0.0.0 --port 8000 --reload"
timeout /t 2 /nobreak >nul
start "Express Backend (Port 5000)" cmd /k "cd /d %~dp0backend && npm run dev"
timeout /t 2 /nobreak >nul
start "React Frontend (Port 3000)" cmd /k "cd /d %~dp0frontend && npm run dev"
echo All 3 services launched!
echo Access the frontend dashboard at: http://localhost:3000
