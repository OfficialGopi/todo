# 🚀 TODOISH - Full Stack Todo Application

A modern, professional full-stack todo application built with React, Node.js, and MongoDB. Features a beautiful Kanban board interface, real-time updates, and comprehensive project management capabilities.

## ✨ **Features**

- **🎯 Task Management**: Kanban board with drag-and-drop functionality
- **👥 Project Collaboration**: Team-based project management
- **🔐 Authentication**: Secure JWT-based authentication system
- **📱 Responsive Design**: Mobile-first, modern UI/UX
- **⚡ Real-time Updates**: Live task status synchronization
- **📁 File Attachments**: Support for file uploads and management
- **📧 Email Integration**: Password reset and notifications
- **🛡️ Security**: Role-based access control and validation

## 🛠️ **Tech Stack**

### **Frontend**

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Zustand** - Lightweight state management
- **React Router DOM** - Client-side routing

### **Backend**

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - File upload service
- **Nodemailer** - Email functionality

## 🚀 **Quick Start**

### **Prerequisites**

- Node.js 18+
- MongoDB (local or cloud)
- npm or yarn

### **1. Clone the Repository**

```bash
git clone <repository-url>
cd todo
```

### **2. Environment Setup**

We've provided automated setup scripts for your convenience:

**On Linux/Mac:**

```bash
chmod +x setup-env.sh
./setup-env.sh
```

**On Windows:**

```bash
setup-env.bat
```

**Manual Setup:**

1. Copy `server/env.example` to `server/.env`
2. Copy `client/env.example` to `client/.env`
3. Edit both files with your configuration

### **3. Install Dependencies**

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### **4. Start the Application**

```bash
# Terminal 1 - Start Backend
cd server
npm run dev

# Terminal 2 - Start Frontend
cd client
npm run dev
```

### **5. Open Your Browser**

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api

## 🔧 **Environment Configuration**

### **Required Environment Variables**

**Backend (`server/.env`):**

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/todoish
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
COOKIE_SECRET=your-super-secret-cookie-key
CORS_ORIGIN=http://localhost:5173
```

**Frontend (`client/.env`):**

```env
VITE_SERVER_URL=http://localhost:8000/api
```

### **Optional Environment Variables**

- Cloudinary configuration for file uploads
- Mailtrap configuration for email functionality
- Rate limiting and security settings

📚 **See `ENVIRONMENT_SETUP.md` for detailed configuration instructions.**

## 📁 **Project Structure**

```
todo/
├── server/                 # Backend API
│   ├── src/
│   │   ├── app/          # Application logic
│   │   ├── routes/       # API routes
│   │   ├── models/       # Database models
│   │   ├── middlewares/  # Custom middlewares
│   │   └── utils/        # Utility functions
│   ├── env.example       # Environment template
│   └── package.json
├── client/                # Frontend React app
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── store/        # State management
│   │   └── utils/        # Utility functions
│   ├── env.example       # Environment template
│   └── package.json
├── setup-env.sh          # Linux/Mac setup script
├── setup-env.bat         # Windows setup script
├── ENVIRONMENT_SETUP.md  # Detailed setup guide
└── README.md             # This file
```

## 🔐 **Authentication & Security**

- **JWT Tokens**: Secure authentication with access and refresh tokens
- **Password Hashing**: bcryptjs with configurable salt rounds
- **Role-based Access**: ADMIN, PROJECT_ADMIN, MEMBER roles
- **Input Validation**: Zod schema validation
- **CORS Protection**: Configurable cross-origin resource sharing
- **Rate Limiting**: Protection against brute force attacks

## 📊 **API Endpoints**

### **Authentication**

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh-token` - Token refresh
- `POST /api/v1/auth/forgot-password` - Password reset request
- `POST /api/v1/auth/reset-password` - Password reset

### **Projects**

- `GET /api/v1/project` - Get all projects
- `POST /api/v1/project` - Create project
- `GET /api/v1/project/:id` - Get project by ID
- `PATCH /api/v1/project/:id` - Update project
- `DELETE /api/v1/project/:id` - Delete project

### **Tasks**

- `GET /api/v1/task` - Get all tasks
- `POST /api/v1/task` - Create task
- `GET /api/v1/task/:id` - Get task by ID
- `PATCH /api/v1/task/:id` - Update task
- `DELETE /api/v1/task/:id` - Delete task

📚 **See `API_DOCUMENTATION.md` for complete API documentation.**

## 🎨 **UI/UX Features**

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on all device sizes
- **Smooth Animations**: Framer Motion powered transitions
- **Dark/Light Mode**: Customizable theme support
- **Professional Typography**: Inter, Poppins, and JetBrains Mono fonts
- **Interactive Elements**: Hover effects and micro-interactions

## 🧪 **Development**

### **Available Scripts**

**Backend:**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
```

**Frontend:**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
```

### **Code Quality**

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks

## 🚀 **Deployment**

### **Backend Deployment**

- Deploy to platforms like Heroku, Railway, or DigitalOcean
- Set production environment variables
- Configure MongoDB Atlas for production database
- Set up proper CORS origins

### **Frontend Deployment**

- Build the application: `npm run build`
- Deploy `dist/` folder to platforms like Vercel, Netlify, or AWS S3
- Configure environment variables for production

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License.

## 🆘 **Support**

- Create an issue in the repository
- Check the documentation files
- Review the environment setup guide

## 🙏 **Acknowledgments**

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- MongoDB for the flexible database
- All open-source contributors

---

**Built with ❤️ using modern web technologies**

**Happy coding! 🎉**
