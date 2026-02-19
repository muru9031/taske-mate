# Task Mate - Quick Reference Guide

## 🔐 Demo Credentials

### Admin Account
```
Email: admin@taskmate.com
Password: admin123
Role: Admin
```

### User Accounts
```
Email: rajesh@taskmate.com
Password: user123
Role: User

Email: priya@taskmate.com
Password: user123
Role: User

Email: amit@taskmate.com
Password: user123
Role: User
```

## 🎯 Feature Checklist

### ✅ Admin Features
- [x] Login with Admin role
- [x] View dashboard with all task statistics
- [x] Create new tasks
- [x] Assign tasks to users
- [x] Delete tasks
- [x] View all tasks
- [x] Create teams
- [x] Add members to teams
- [x] View all registered users
- [x] Search users by name/email

### ✅ User Features
- [x] Login with User role
- [x] View dashboard with assigned task statistics
- [x] View only assigned tasks
- [x] Update task status (Pending/In Progress/Completed)
- [x] Cannot create tasks
- [x] Cannot delete tasks
- [x] Cannot access Teams page
- [x] Cannot access Users page

## 📱 Page Routes

```
/                 → Landing Page (Public)
/login            → Login Page (Public)
/register         → Register Page (Public)
/dashboard        → Dashboard (Protected)
/tasks            → Tasks Page (Protected)
/teams            → Teams Page (Admin Only)
/users            → Users Page (Admin Only)
```

## 🎨 UI Color Scheme

```
Primary Blue:     #3498db
Dark Blue:        #2c3e50
Green (Success):  #27ae60
Orange (Warning): #f39c12
Red (Danger):     #e74c3c
Gray (Neutral):   #95a5a6
Light Gray:       #ecf0f1
```

## 📊 Task Priority Levels

- **High** → Red (#e74c3c)
- **Medium** → Orange (#f39c12)
- **Low** → Blue (#3498db)

## 📈 Task Status Options

- **Pending** → Gray (#95a5a6)
- **In Progress** → Orange (#f39c12)
- **Completed** → Green (#27ae60)

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Review Statement (Memorize This!)

"Task Mate follows a role-based workflow where admins create and assign tasks, and users update task status. Currently, all roles, members, and tasks are simulated in the frontend using mock data. Backend services will be integrated in the next phase using Spring Boot REST APIs."

## 🎬 Demo Script (5 Minutes)

### Minute 1: Introduction
- Open landing page
- Explain project purpose and roles
- Show features overview

### Minute 2: Admin Demo
- Login as admin@taskmate.com
- Show dashboard statistics
- Navigate to Tasks page

### Minute 3: Task Management
- Create a new task
- Assign to a user
- Show task details (priority, due date, assigned to)

### Minute 4: Team & User Management
- Navigate to Teams page
- Show existing teams
- Navigate to Users page
- Demonstrate search functionality

### Minute 5: User Demo
- Logout and login as rajesh@taskmate.com
- Show user dashboard (only assigned tasks)
- Update a task status
- Show restricted access (no Teams/Users menu)

## 🔧 Troubleshooting

### Issue: Page not found after refresh
**Solution:** This is normal for client-side routing. In production, configure server redirects.

### Issue: Changes lost after refresh
**Solution:** Expected behavior with mock data. Backend integration will persist data.

### Issue: Can't access admin pages as user
**Solution:** This is correct! Role-based access control is working.

## 📞 Key Technical Points

1. **State Management:** Context API (AuthContext, TaskContext, TeamContext)
2. **Routing:** React Router DOM v6
3. **Styling:** CSS-in-JS (inline styles)
4. **Build Tool:** Vite
5. **Data:** Mock data in `src/data/dummyData.js`

## 🎓 For Viva/Review

### What works:
✅ Role-based authentication
✅ Task CRUD operations (frontend)
✅ Team management
✅ User listing and search
✅ Status updates
✅ Responsive design

### What's simulated:
⚠️ Authentication (no real backend)
⚠️ Data persistence (resets on refresh)
⚠️ API calls (using Context API)

### What's planned:
🔜 Spring Boot REST APIs
🔜 MySQL/PostgreSQL database
🔜 JWT authentication
🔜 Real-time updates
🔜 Email notifications

## 💡 Pro Tips

1. Always mention "frontend-only" and "mock data"
2. Emphasize role-based access control
3. Explain the separation of Admin vs User capabilities
4. Highlight the clean architecture for backend integration
5. Show confidence in explaining Context API usage
6. Be ready to explain why certain features are restricted by role
