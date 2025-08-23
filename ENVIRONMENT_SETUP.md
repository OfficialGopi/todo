# 🌍 Environment Setup Guide

This guide will help you set up the environment variables for both the frontend and backend of the TODOISH application.

## 📁 **File Structure**

```
todo/
├── server/
│   └── env.example          # Backend environment template
├── client/
│   └── env.example          # Frontend environment template
└── ENVIRONMENT_SETUP.md     # This file
```

## 🚀 **Quick Setup**

### **Step 1: Backend Environment**

1. Navigate to the `server` directory
2. Copy `env.example` to `.env`:
   ```bash
   cd server
   cp env.example .env
   ```
3. Edit `.env` with your actual values

### **Step 2: Frontend Environment**

1. Navigate to the `client` directory
2. Copy `env.example` to `.env`:
   ```bash
   cd client
   cp env.example .env
   ```
3. Edit `.env` with your actual values

## 🔧 **Backend Environment Variables**

### **Required Variables (Must be set)**

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/todoish

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production

# Cookie Configuration
COOKIE_SECRET=your-super-secret-cookie-key-change-this-in-production

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### **Optional Variables (Recommended for production)**

```env
# Cloudinary Configuration (for file uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Mail Configuration
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your-mailtrap-user
MAIL_PASS=your-mailtrap-password
MAIL_FROM=noreply@todoish.com

# Security
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_MAX_REQUESTS=100
```

## 🎨 **Frontend Environment Variables**

### **Required Variables (Must be set)**

```env
# Backend API Configuration
VITE_SERVER_URL=http://localhost:8000/api
```

### **Optional Variables**

```env
# App Configuration
VITE_APP_NAME=TODOISH
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Organize Tasks, Amplify Results

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=false
```

## 🔐 **Security Best Practices**

### **JWT Secrets**

- Use strong, random strings (at least 32 characters)
- Never commit secrets to version control
- Use different secrets for development and production
- Example: `JWT_SECRET=my-super-secret-jwt-key-2024-production`

### **Cookie Secrets**

- Use strong, random strings
- Different from JWT secrets
- Example: `COOKIE_SECRET=my-super-secret-cookie-key-2024-production`

### **Database URIs**

- Use environment-specific URIs
- Never expose production credentials
- Example: `MONGODB_URI=mongodb://localhost:27017/todoish-dev`

## 🛠️ **Development Setup**

### **Local Development**

```env
# Backend (.env)
NODE_ENV=development
PORT=8000
MONGODB_URI=mongodb://localhost:27017/todoish-dev
JWT_SECRET=dev-jwt-secret-key-2024
COOKIE_SECRET=dev-cookie-secret-key-2024
CORS_ORIGIN=http://localhost:5173

# Frontend (.env)
VITE_SERVER_URL=http://localhost:8000/api
VITE_DEV_MODE=true
```

### **Production Setup**

```env
# Backend (.env)
NODE_ENV=production
PORT=8000
MONGODB_URI=mongodb://your-production-db-url
JWT_SECRET=your-production-jwt-secret
COOKIE_SECRET=your-production-cookie-secret
CORS_ORIGIN=https://yourdomain.com

# Frontend (.env)
VITE_SERVER_URL=https://yourdomain.com/api
VITE_DEV_MODE=false
```

## 📋 **Environment Checklist**

### **Before Starting Development**

- [ ] Backend `.env` file created
- [ ] Frontend `.env` file created
- [ ] MongoDB running locally
- [ ] JWT secrets configured
- [ ] CORS origin set correctly

### **Before Production Deployment**

- [ ] Production environment variables set
- [ ] Strong secrets generated
- [ ] Database credentials updated
- [ ] CORS origins configured
- [ ] File upload services configured
- [ ] Email services configured

## 🚨 **Important Notes**

1. **Never commit `.env` files** to version control
2. **Use different secrets** for development and production
3. **Keep secrets secure** and rotate them regularly
4. **Test environment variables** before deployment
5. **Use strong passwords** for all services

## 🔍 **Troubleshooting**

### **Common Issues**

1. **"Cannot connect to database"**

   - Check `MONGODB_URI` is correct
   - Ensure MongoDB is running
   - Verify network connectivity

2. **"JWT verification failed"**

   - Check `JWT_SECRET` is set correctly
   - Ensure secret hasn't changed
   - Verify token expiration settings

3. **"CORS error"**

   - Check `CORS_ORIGIN` matches frontend URL
   - Ensure `CORS_CREDENTIALS=true`
   - Verify frontend is running on correct port

4. **"Frontend can't connect to backend"**
   - Check `VITE_SERVER_URL` is correct
   - Ensure backend is running
   - Verify ports match

## 📚 **Additional Resources**

- [MongoDB Connection String Format](https://docs.mongodb.com/manual/reference/connection-string/)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
- [Environment Variables Best Practices](https://12factor.net/config)
- [CORS Configuration](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**⚠️ Remember: Keep your environment files secure and never commit them to version control!**
