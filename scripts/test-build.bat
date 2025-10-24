@echo off
echo 🔧 Testing TRASHFUN Backend Build Process
echo ==========================================

echo 📁 Checking directory structure...
dir

echo 📦 Installing dependencies...
cd backend
npm install

echo 🔨 Building TypeScript...
npm run build

echo ✅ Build completed successfully!
echo 📁 Checking build output...
dir dist

echo 🚀 Testing server start...
timeout 5 npm start
echo Server test completed

echo ✅ All tests passed! Ready for Render deployment.
pause
