# TODO App API Documentation

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication
All protected endpoints require:
- `access-token` in cookies or `Authorization: Bearer <token>` header
- Email verification completed

## Endpoints

### 🔐 Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | User registration | ❌ |
| POST | `/auth/login` | User login | ❌ |
| GET | `/auth/verify-email/:token` | Verify email | ❌ |
| PATCH | `/auth/resend-email-verification-token` | Resend verification | ✅ |
| PATCH | `/auth/refresh-access-token` | Refresh tokens | ❌ |
| DELETE | `/auth/logout` | User logout | ✅ |
| PUT | `/auth/change-current-password` | Change password | ✅ |
| POST | `/auth/forgot-password-request` | Request password reset | ❌ |
| POST | `/auth/reset-forgotten-password` | Reset password | ❌ |

### 📁 Projects
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/project/create-project` | Create project | ✅ |
| GET | `/project/get-all-projects` | Get user's projects | ✅ |
| GET | `/project/id/:projectId` | Get project details | ✅ |
| PUT | `/project/id/:projectId` | Update project | ✅ |
| DELETE | `/project/id/:projectId` | Delete project | ✅ |
| GET | `/project/id/:projectId/members` | Get project members | ✅ |
| POST | `/project/id/:projectId/members` | Add member | ✅ |
| PUT | `/project/id/:projectId/members` | Update member role | ✅ |
| DELETE | `/project/id/:projectId/members` | Remove member | ✅ |

### 📝 Notes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/project/id/:projectId/note/get-all-notes` | Get project notes | ✅ |
| POST | `/project/id/:projectId/note/create-note` | Create note | ✅ |
| GET | `/project/id/:projectId/note/id/:noteId` | Get note | ✅ |
| PATCH | `/project/id/:projectId/note/id/:noteId` | Update note | ✅ |
| DELETE | `/project/id/:projectId/note/id/:noteId` | Delete note | ✅ |

### ✅ Tasks
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/project/id/:projectId/task/get-all-tasks` | Get project tasks | ✅ |
| POST | `/project/id/:projectId/task/create-task` | Create task | ✅ |
| GET | `/project/id/:projectId/task/id/:taskId` | Get task | ✅ |
| PUT | `/project/id/:projectId/task/id/:taskId` | Update task | ✅ |
| DELETE | `/project/id/:projectId/task/id/:taskId` | Delete task | ✅ |
| POST | `/project/id/:projectId/task/id/:taskId/create-subtask` | Create subtask | ✅ |
| GET | `/project/id/:projectId/task/id/:taskId/subtask/id/:subTaskId` | Get subtask | ✅ |
| PUT | `/project/id/:projectId/task/id/:taskId/subtask/id/:subTaskId` | Update subtask | ✅ |
| DELETE | `/project/id/:projectId/task/id/:taskId/subtask/id/:subTaskId` | Delete subtask | ✅ |

### 🏥 Health Check
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Server health status | ❌ |

## Request/Response Format

### Success Response
```json
{
  "statusCode": 200,
  "data": {},
  "success": true,
  "message": "Success message"
}
```

### Error Response
```json
{
  "statusCode": 400,
  "success": false,
  "message": "Error message",
  "errors": []
}
```

## User Roles
- `ADMIN`: Full access to all projects
- `PROJECT_ADMIN`: Admin access to specific project
- `MEMBER`: Basic access to assigned tasks

## Task Status
- `TODO`: Task not started
- `IN_PROGRESS`: Task in progress
- `DONE`: Task completed

## File Upload
- Task attachments: Max 10 files, 10MB each
- Avatar: Max 5MB
- Supported formats: All file types
