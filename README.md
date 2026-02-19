# Task Mate - Role-Based Task Management System

A React-based task management application designed for students and company teams with role-based access control.

## 🎯 Project Overview

Task Mate follows a role-based workflow where admins create and assign tasks, and users update task status. Currently, all roles, members, and tasks are simulated in the frontend using mock data. Backend services will be integrated in the next phase using Spring Boot REST APIs.

## 👥 Roles & Access Control

### Admin / Manager
- Create teams
- View all registered users
- Add members to teams
- Create tasks
- Assign tasks to team members
- Delete tasks
- View all tasks

### User (Student / Employee)
- View only assigned tasks
- Update task status (Pending → In Progress → Completed)
- Cannot create, assign, or delete tasks

## ✨ Features

### Landing Page
- Project introduction
- Role-based system explanation
- Login/Register options

### Authentication
- Login with role selection (Admin/User)
- Register with role assignment
- Mock authentication (no backend)

### Dashboard
- Task summary cards:
  - Total Tasks
  - Completed Tasks
  - Pending Tasks
  - In Progress Tasks
- Role-specific data display

### Team Management (Admin Only)
- Create teams
- View all teams
- Add members to teams
- View team members

### User Management (Admin Only)
- View all registered users
- Search users by name/email
- Filter functionality

### Task Management
**Admin:**
- Create tasks with:
  - Title
  - Description
  - Priority (High/Medium/Low)
  - Due Date
  - Assign to team members
- Delete tasks
- View all tasks

**User:**
- View assigned tasks only
- Update task status via dropdown
- Cannot create or delete tasks

## 🛠️ Tech Stack

- React 18
- React Router DOM v6
- Context API (State Management)
- CSS-in-JS (Inline Styles)
- Vite (Build Tool)

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation with role-based links
│   └── TaskCard.jsx        # Task display component
├── pages/
│   ├── Home.jsx            # Landing page
│   ├── Login.jsx           # Login with role selection
│   ├── Register.jsx        # Registration with role
│   ├── Dashboard.jsx       # Task statistics
│   ├── Tasks.jsx           # Task management
│   ├── Users.jsx           # User list (Admin only)
│   └── Teams.jsx           # Team management (Admin only)
├── context/
│   ├── AuthContext.jsx     # Authentication state
│   ├── TaskContext.jsx     # Task management state
│   └── TeamContext.jsx     # Team management state
├── data/
│   └── dummyData.js        # Mock users, teams, tasks
├── App.jsx                 # Main app with routing
└── main.jsx                # Entry point
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Run Development Server

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

## 🔐 Demo Credentials

### Admin Account
- Email: `admin@taskmate.com`
- Password: `admin123`
- Role: Admin

### User Accounts
- Email: `rajesh@taskmate.com`
- Password: `user123`
- Role: User

(More user accounts available in `src/data/dummyData.js`)

## 📊 Current Implementation Status

✅ **Completed (Frontend Only)**
- Role-based authentication
- Admin dashboard with statistics
- User dashboard with assigned tasks
- Task creation and assignment (Admin)
- Task status updates (User)
- Team creation and management
- User listing and search
- Responsive UI design
- Mock data simulation

❌ **Not Implemented (Future Phase)**
- Backend REST APIs
- Database integration
- Real authentication with JWT
- File uploads
- Email notifications
- Real-time updates

## 🔄 Backend Integration Plan

The application is designed to easily integrate with Spring Boot REST APIs:

### Planned API Endpoints

```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/users
GET    /api/users/{id}
POST   /api/teams
GET    /api/teams
POST   /api/teams/{id}/members
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}
GET    /api/tasks/user/{userId}
```

### Migration Steps
1. Replace Context API calls with Axios/Fetch API calls
2. Implement JWT token storage and management
3. Add loading states and error handling
4. Connect to Spring Boot backend
5. Replace dummy data with real API responses

## 🌐 Deployment

The application can be deployed as a static site on:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```

## 📝 Review Statement

"Task Mate follows a role-based workflow where admins create and assign tasks, and users update task status. Currently, all roles, members, and tasks are simulated in the frontend using mock data. Backend services will be integrated in the next phase using Spring Boot REST APIs."

## 🎓 Use Cases

### For Students
- Project task management
- Group assignment tracking
- Study schedule organization
- Team collaboration

### For Companies
- Sprint task management
- Team workload distribution
- Project progress tracking
- Employee task assignment

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Developed as a frontend-only demonstration of a role-based task management system.
