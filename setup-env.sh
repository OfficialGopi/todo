#!/bin/bash

# TODOISH Environment Setup Script
# This script helps you set up environment files for both frontend and backend

echo "🚀 TODOISH Environment Setup"
echo "=============================="
echo ""

# Check if we're in the right directory
if [ ! -d "server" ] || [ ! -d "client" ]; then
    echo "❌ Error: Please run this script from the root directory of the project"
    echo "   (where both 'server' and 'client' folders exist)"
    exit 1
fi

echo "📁 Setting up environment files..."
echo ""

# Backend setup
echo "🔧 Setting up Backend Environment..."
if [ -f "server/.env" ]; then
    echo "   ⚠️  server/.env already exists. Skipping..."
else
    if [ -f "server/env.example" ]; then
        cp server/env.example server/.env
        echo "   ✅ Created server/.env from env.example"
        echo "   📝 Please edit server/.env with your actual values"
    else
        echo "   ❌ server/env.example not found"
    fi
fi

echo ""

# Frontend setup
echo "🎨 Setting up Frontend Environment..."
if [ -f "client/.env" ]; then
    echo "   ⚠️  client/.env already exists. Skipping..."
else
    if [ -f "client/env.example" ]; then
        cp client/env.example client/.env
        echo "   ✅ Created client/.env from env.example"
        echo "   📝 Please edit client/.env with your actual values"
    else
        echo "   ❌ client/env.example not found"
    fi
fi

echo ""

# Generate random secrets
echo "🔐 Generating Random Secrets..."
JWT_SECRET=$(openssl rand -base64 32)
JWT_REFRESH_SECRET=$(openssl rand -base64 32)
COOKIE_SECRET=$(openssl rand -base64 32)

echo "   Generated JWT_SECRET: $JWT_SECRET"
echo "   Generated JWT_REFRESH_SECRET: $JWT_REFRESH_SECRET"
echo "   Generated COOKIE_SECRET: $COOKIE_SECRET"
echo ""

# Update backend .env if it exists
if [ -f "server/.env" ]; then
    echo "🔄 Updating server/.env with generated secrets..."
    
    # Update JWT_SECRET
    sed -i.bak "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" server/.env
    
    # Update JWT_REFRESH_SECRET
    sed -i.bak "s/JWT_REFRESH_SECRET=.*/JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET/" server/.env
    
    # Update COOKIE_SECRET
    sed -i.bak "s/COOKIE_SECRET=.*/COOKIE_SECRET=$COOKIE_SECRET/" server/.env
    
    # Remove backup files
    rm server/.env.bak
    
    echo "   ✅ Updated server/.env with generated secrets"
else
    echo "   ⚠️  server/.env not found. Please create it manually."
fi

echo ""

echo "🎉 Environment Setup Complete!"
echo "=============================="
echo ""
echo "📋 Next Steps:"
echo "1. Edit server/.env with your MongoDB connection string"
echo "2. Edit server/.env with your Cloudinary credentials (if using file uploads)"
echo "3. Edit server/.env with your Mailtrap credentials (if using email)"
echo "4. Start MongoDB: mongod"
echo "5. Start Backend: cd server && npm run dev"
echo "6. Start Frontend: cd client && npm run dev"
echo ""
echo "📚 For detailed instructions, see ENVIRONMENT_SETUP.md"
echo ""
echo "⚠️  Remember: Never commit .env files to version control!"
