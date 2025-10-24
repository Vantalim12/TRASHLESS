@echo off
echo 🌱 Starting TRASHFUN Development Servers...

echo Starting backend server on port 5000...
start /min cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting frontend server on port 3000...
echo Frontend will open in your default browser automatically.
cd frontend
npm start
