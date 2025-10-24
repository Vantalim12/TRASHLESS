# PowerShell script to start both frontend and backend servers
Write-Host "🌱 Starting TRASHFUN Development Servers..." -ForegroundColor Green

# Start backend server in background
Write-Host "Starting backend server on port 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev" -WindowStyle Minimized

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend server
Write-Host "Starting frontend server on port 3000..." -ForegroundColor Yellow
Write-Host "Frontend will open in your default browser automatically." -ForegroundColor Cyan
cd frontend
npm start
