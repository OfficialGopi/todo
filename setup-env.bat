@echo off
REM TODOISH Environment Setup Script for Windows
REM This script helps you set up environment files for both frontend and backend

echo 🚀 TODOISH Environment Setup
echo ==============================
echo.

REM Check if we're in the right directory
if not exist "server" (
    echo ❌ Error: Please run this script from the root directory of the project
    echo    (where both 'server' and 'client' folders exist)
    pause
    exit /b 1
)

if not exist "client" (
    echo ❌ Error: Please run this script from the root directory of the project
    echo    (where both 'server' and 'client' folders exist)
    pause
    exit /b 1
)

echo 📁 Setting up environment files...
echo.

REM Backend setup
echo 🔧 Setting up Backend Environment...
if exist "server\.env" (
    echo    ⚠️  server\.env already exists. Skipping...
) else (
    if exist "server\env.example" (
        copy "server\env.example" "server\.env" >nul
        echo    ✅ Created server\.env from env.example
        echo    📝 Please edit server\.env with your actual values
    ) else (
        echo    ❌ server\env.example not found
    )
)

echo.

REM Frontend setup
echo 🎨 Setting up Frontend Environment...
if exist "client\.env" (
    echo    ⚠️  client\.env already exists. Skipping...
) else (
    if exist "client\env.example" (
        copy "client\env.example" "client\.env" >nul
        echo    ✅ Created client\.env from env.example
        echo    📝 Please edit client\.env with your actual values
    ) else (
        echo    ❌ client\env.example not found
    )
)

echo.

echo 🔐 Generating Random Secrets...
echo    Note: On Windows, you'll need to manually generate secure secrets
echo    You can use online tools like: https://generate-secret.vercel.app/32
echo.

echo 🎉 Environment Setup Complete!
echo ==============================
echo.
echo 📋 Next Steps:
echo 1. Edit server\.env with your MongoDB connection string
echo 2. Edit server\.env with your JWT secrets (generate secure random strings)
echo 3. Edit server\.env with your Cloudinary credentials (if using file uploads)
echo 4. Edit server\.env with your Mailtrap credentials (if using email)
echo 5. Start MongoDB: mongod
echo 6. Start Backend: cd server ^&^& npm run dev
echo 7. Start Frontend: cd client ^&^& npm run dev
echo.
echo 📚 For detailed instructions, see ENVIRONMENT_SETUP.md
echo.
echo ⚠️  Remember: Never commit .env files to version control!
echo.
pause
