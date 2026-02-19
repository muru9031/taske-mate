export const dummyUsers = [
  { id: 1, name: "Admin User", email: "admin@taskmate.com", role: "Admin", password: "admin123" },
  { id: 2, name: "Rajesh Kumar", email: "rajesh@taskmate.com", role: "User", password: "user123" },
  { id: 3, name: "Priya Sharma", email: "priya@taskmate.com", role: "User", password: "user123" },
  { id: 4, name: "Amit Patel", email: "amit@taskmate.com", role: "User", password: "user123" },
  { id: 5, name: "Sneha Reddy", email: "sneha@taskmate.com", role: "User", password: "user123" },
  { id: 6, name: "Vikram Singh", email: "vikram@taskmate.com", role: "User", password: "user123" },
  { id: 7, name: "Ananya Iyer", email: "ananya@taskmate.com", role: "User", password: "user123" },
  { id: 8, name: "Karthik Menon", email: "karthik@taskmate.com", role: "User", password: "user123" }
];

export const dummyTeams = [
  { 
    id: 1, 
    name: "Development Team", 
    members: [2, 3, 4],
    createdBy: 1,
    createdAt: "2024-01-15"
  },
  { 
    id: 2, 
    name: "Design Team", 
    members: [5, 6],
    createdBy: 1,
    createdAt: "2024-01-20"
  },
  { 
    id: 3, 
    name: "Marketing Team", 
    members: [7, 8],
    createdBy: 1,
    createdAt: "2024-01-25"
  }
];

export const dummyProjects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "Build a full-stack e-commerce application",
    teamId: 1,
    createdBy: 1,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Mobile App Redesign",
    description: "Redesign the mobile application UI/UX",
    teamId: 2,
    createdBy: 1,
    createdAt: "2024-01-20"
  },
  {
    id: 3,
    name: "Marketing Campaign Q1",
    description: "Launch Q1 marketing campaign",
    teamId: 3,
    createdBy: 1,
    createdAt: "2024-01-25"
  }
];

export const dummyTasks = [
  // Individual Tasks
  {
    id: 1,
    title: "Review Code Pull Requests",
    description: "Review pending PRs from team members",
    priority: "High",
    status: "Pending",
    dueDate: "2024-02-10",
    type: "individual",
    assignedTo: 2,
    createdBy: 1,
    createdAt: "2024-01-28"
  },
  {
    id: 2,
    title: "Update Personal Profile",
    description: "Update profile information and skills",
    priority: "Low",
    status: "In Progress",
    dueDate: "2024-02-15",
    type: "individual",
    assignedTo: 3,
    createdBy: 1,
    createdAt: "2024-01-29"
  },
  {
    id: 3,
    title: "Attend Training Session",
    description: "Complete React advanced training",
    priority: "Medium",
    status: "Completed",
    dueDate: "2024-02-08",
    type: "individual",
    assignedTo: 2,
    createdBy: 1,
    createdAt: "2024-01-30"
  },
  // Group Tasks - E-Commerce Platform
  {
    id: 4,
    title: "Design Database Schema",
    description: "Create ER diagram and design database tables",
    priority: "High",
    status: "Completed",
    dueDate: "2024-02-10",
    type: "group",
    projectId: 1,
    assignedTo: 2,
    createdBy: 1,
    createdAt: "2024-01-28"
  },
  {
    id: 5,
    title: "Implement User Authentication",
    description: "Build login and registration functionality",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-02-15",
    type: "group",
    projectId: 1,
    assignedTo: 3,
    createdBy: 1,
    createdAt: "2024-01-29"
  },
  {
    id: 6,
    title: "Setup Payment Gateway",
    description: "Integrate Stripe payment system",
    priority: "High",
    status: "Pending",
    dueDate: "2024-02-20",
    type: "group",
    projectId: 1,
    assignedTo: 4,
    createdBy: 1,
    createdAt: "2024-02-01"
  },
  // Group Tasks - Mobile App Redesign
  {
    id: 7,
    title: "Create Wireframes",
    description: "Design wireframes for all screens",
    priority: "High",
    status: "Completed",
    dueDate: "2024-02-12",
    type: "group",
    projectId: 2,
    assignedTo: 5,
    createdBy: 1,
    createdAt: "2024-01-30"
  },
  {
    id: 8,
    title: "Design Mobile UI Components",
    description: "Create reusable UI components",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2024-02-16",
    type: "group",
    projectId: 2,
    assignedTo: 6,
    createdBy: 1,
    createdAt: "2024-02-04"
  },
  {
    id: 9,
    title: "User Testing",
    description: "Conduct user testing sessions",
    priority: "Medium",
    status: "Pending",
    dueDate: "2024-02-25",
    type: "group",
    projectId: 2,
    assignedTo: 5,
    createdBy: 1,
    createdAt: "2024-02-05"
  },
  // Group Tasks - Marketing Campaign
  {
    id: 10,
    title: "Create Social Media Content",
    description: "Prepare posts for product launch",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-02-18",
    type: "group",
    projectId: 3,
    assignedTo: 7,
    createdBy: 1,
    createdAt: "2024-02-03"
  },
  {
    id: 11,
    title: "Email Campaign Setup",
    description: "Setup automated email campaigns",
    priority: "Medium",
    status: "Pending",
    dueDate: "2024-02-22",
    type: "group",
    projectId: 3,
    assignedTo: 8,
    createdBy: 1,
    createdAt: "2024-02-06"
  }
];
