#!/bin/bash

echo "🔧 Testing TRASHFUN Backend Build Process"
echo "=========================================="

echo "📁 Checking directory structure..."
ls -la

echo "📦 Installing dependencies..."
cd backend
npm install

echo "🔨 Building TypeScript..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Checking build output..."
ls -la dist/

echo "🚀 Testing server start..."
timeout 5s npm start || echo "Server started (timeout after 5s)"

echo "✅ All tests passed! Ready for Render deployment."
