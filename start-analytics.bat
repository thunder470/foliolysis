@echo off
echo Starting Python Analytics Microservice on port 8000...
cd /d "%~dp0analytics"
.\venv\Scripts\uvicorn main:app --host 0.0.0.0 --port 8000 --reload
