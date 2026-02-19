import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { TeamProvider } from './context/TeamContext';
import { ProjectProvider } from './context/ProjectContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Users from './pages/Users';
import Teams from './pages/Teams';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <TeamProvider>
          <ProjectProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/users" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
              </Routes>
            </Router>
          </ProjectProvider>
        </TeamProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
