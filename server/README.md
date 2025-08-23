# TODO App Server

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with:
```env
NODE_ENV=development
PORT=8000
BASE_URL=http://localhost:8000
ORIGIN=http://localhost:3000
DATABASE_URL=mongodb://localhost:27017/todo_app
ACCESS_TOKEN_SECRET=your_secret_here
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_secret_here
REFRESH_TOKEN_EXPIRY=7d
CLOUDINARY_NAME=your_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_user
MAILTRAP_PASSWORD=your_password
MAILTRAP_SENDER_EMAIL=noreply@todoapp.com
```

3. Start MongoDB

4. Run development server:
```bash
npm run build:dev
```

## Features
- ✅ User authentication with JWT
- ✅ Email verification
- ✅ Project management
- ✅ Task management with subtasks
- ✅ Notes system
- ✅ Role-based access control
- ✅ File uploads (Cloudinary)
- ✅ Email notifications (Mailtrap)

## API Documentation
See `API_DOCUMENTATION.md` for complete endpoint details.
