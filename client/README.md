# TODOISH - Frontend Client

A modern, responsive React application for project and task management with a beautiful Kanban board interface.

## 🚀 Features

- **Modern UI/UX**: Built with Tailwind CSS v4 and Framer Motion
- **Authentication**: Complete login/signup system with JWT tokens
- **Project Management**: Create, update, and manage projects
- **Task Management**: Kanban board with drag-and-drop functionality
- **Real-time Updates**: Live task status updates
- **Responsive Design**: Works perfectly on all devices
- **Professional Typography**: Custom font system (Inter, Poppins, JetBrains Mono)

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Zustand** - Lightweight state management
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - Beautiful notifications
- **Lucide React** - Modern icon library

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── KanbanBoard.tsx # Main task management board
│   └── ProtectedRoute.tsx # Route protection component
├── pages/              # Page components
│   ├── LandingPage.tsx # Landing page
│   ├── Login.tsx      # Login page
│   ├── SignUp.tsx     # Registration page
│   └── Dashboard.tsx  # Main dashboard
├── services/           # API service layer
│   ├── auth.services.ts    # Authentication API calls
│   ├── project.services.ts # Project API calls
│   └── task.services.ts    # Task API calls
├── store/              # State management
│   ├── useAuthStore.ts     # Authentication state
│   └── useProjectStore.ts  # Project and task state
├── utils/              # Utility functions
│   ├── api.ts              # Axios configuration
│   └── handleTokens.ts     # Token management
└── style.css          # Global styles and Tailwind imports
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend server running (see server README)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd todo/client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the client directory:

   ```env
   VITE_SERVER_URL=http://localhost:8000/api
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔗 Backend Connection

The frontend is now fully connected to the backend API with the following features:

### Authentication

- **Login**: `/api/v1/auth/login`
- **Register**: `/api/v1/auth/register`
- **Logout**: `/api/v1/auth/logout`
- **Token Refresh**: `/api/v1/auth/refresh-token`
- **Password Reset**: `/api/v1/auth/forgot-password`

### Projects

- **Get Projects**: `/api/v1/project`
- **Create Project**: `/api/v1/project`
- **Update Project**: `/api/v1/project/:id`
- **Delete Project**: `/api/v1/project/:id`
- **Member Management**: `/api/v1/project/:id/member`

### Tasks

- **Get Tasks**: `/api/v1/task`
- **Create Task**: `/api/v1/task`
- **Update Task**: `/api/v1/task/:id`
- **Delete Task**: `/api/v1/task/:id`
- **Move Task**: `/api/v1/task/:id` (PATCH with status)
- **Subtasks**: `/api/v1/task/:id/subtask`
- **Attachments**: `/api/v1/task/:id/attachment`

## 🎨 Design System

### Colors

- **Primary**: Blue (600, 700) for main actions
- **Neutral**: Gray scale (50-900) for backgrounds and text
- **Success**: Green (500, 600) for completed states
- **Error**: Red (500, 600) for error states

### Typography

- **Inter**: Primary font for body text
- **Poppins**: Display font for headings
- **JetBrains Mono**: Monospace for code elements

### Shadows

- **Soft**: `shadow-lg` for subtle elevation
- **Medium**: `shadow-xl` for interactive elements
- **Strong**: Custom shadows for emphasis

## 🔐 Authentication Flow

1. **Login/Register**: User credentials sent to backend
2. **Token Storage**: JWT tokens stored in localStorage
3. **Auto-refresh**: Tokens automatically refreshed on 401 errors
4. **Protected Routes**: Authentication required for dashboard access
5. **Logout**: Tokens cleared and user redirected to home

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Tailwind responsive utilities
- **Touch Friendly**: Optimized for touch interactions
- **Progressive Enhancement**: Works on all screen sizes

## 🚀 Build & Deploy

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy

The built files in `dist/` can be deployed to any static hosting service:

- Vercel
- Netlify
- AWS S3
- GitHub Pages

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📝 API Error Handling

The application includes comprehensive error handling:

- **Network Errors**: Automatic retry with exponential backoff
- **Authentication Errors**: Automatic token refresh
- **Validation Errors**: User-friendly error messages
- **Server Errors**: Graceful fallbacks and retry options

## 🔄 State Management

### Auth Store

- User authentication state
- Token management
- Login/logout actions
- Auto-authentication check

### Project Store

- Project CRUD operations
- Task management
- Real-time updates
- Error handling

## 🎯 Future Enhancements

- [ ] Real-time collaboration
- [ ] File upload progress
- [ ] Advanced task filtering
- [ ] Team member invitations
- [ ] Activity timeline
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Offline support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the API documentation

---

**Built with ❤️ using modern web technologies**
