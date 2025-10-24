#!/bin/bash

echo "🚀 TRASHFUN Deployment Helper"
echo

echo "📋 Pre-deployment checklist:"
echo "✓ Code committed and pushed to Git repository"
echo "✓ Backend builds successfully" 
echo "✓ Frontend builds successfully"
echo

echo "📝 Next Steps:"
echo
echo "1️⃣ Deploy Backend to Render:"
echo "   - Go to https://render.com"
echo "   - Create new Web Service"
echo "   - Connect your Git repository"
echo "   - Use settings from render.yaml"
echo
echo "2️⃣ Update Frontend API URLs:"
echo "   - Get your Render backend URL"
echo "   - Run: node scripts/update-api-urls.js YOUR_BACKEND_URL"
echo
echo "3️⃣ Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Create new project"
echo "   - Set root directory to 'frontend'"
echo "   - Deploy!"
echo
echo "📖 Full guide available in DEPLOYMENT-GUIDE.md"
echo

read -p "Press Enter to continue..."
