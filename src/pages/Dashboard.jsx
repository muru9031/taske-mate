import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import { useProject } from '../context/ProjectContext';
import { dummyUsers } from '../data/dummyData';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, isAdmin } = useAuth();
  const { tasks, getTasksByUser, updateTaskStatus } = useTask();
  const { projects } = useProject();
  const [activeTab, setActiveTab] = useState('tasks');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectTab, setProjectTab] = useState('Pending');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const userTasks = isAdmin() ? tasks : getTasksByUser(currentUser?.id);
  const individualTasks = userTasks.filter(t => t.type === 'individual');
  const groupTasks = userTasks.filter(t => t.type === 'group');
  const allUserTasks = [...individualTasks, ...groupTasks];

  const totalTasks = allUserTasks.length;
  const pendingTasks = allUserTasks.filter(t => t.status === 'Pending').length;
  const inProgressTasks = allUserTasks.filter(t => t.status === 'In Progress').length;
  const completedTasks = allUserTasks.filter(t => t.status === 'Completed').length;

  const getUserProjects = () => {
    if (isAdmin()) return projects;
    const userProjectIds = [...new Set(groupTasks.map(t => t.projectId))];
    return projects.filter(p => userProjectIds.includes(p.id));
  };

  const getTasksByStatus = (taskList, status) => taskList.filter(t => t.status === status);

  const getProjectTasks = (projectId) => groupTasks.filter(t => t.projectId === projectId);

  const handleStatusChange = (taskId, newStatus) => {
    updateTaskStatus(taskId, newStatus);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#e74c3c';
      case 'Medium': return '#f39c12';
      case 'Low': return '#3498db';
      default: return '#95a5a6';
    }
  };

  const renderTaskCard = (task) => (
    <div key={task.id} style={styles.taskCard}>
      <div style={styles.taskHeader}>
        <h4 style={styles.taskTitle}>{task.title}</h4>
        <span style={{...styles.priority, backgroundColor: getPriorityColor(task.priority)}}>
          {task.priority}
        </span>
      </div>
      <p style={styles.taskDesc}>{task.description}</p>
      <div style={styles.taskFooter}>
        <span style={styles.taskDate}>Due: {task.dueDate}</span>
        {!isAdmin() && (
          <select 
            value={task.status} 
            onChange={(e) => handleStatusChange(task.id, e.target.value)}
            style={styles.statusSelect}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        )}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome, {currentUser?.name}!</h1>
        <p style={styles.roleTag}>Role: {currentUser?.role}</p>

        {/* Overview Cards */}
        <div style={styles.overviewCards}>
          <div style={{...styles.card, borderTop: '4px solid #3498db'}}>
            <h3 style={styles.cardTitle}>Total Tasks</h3>
            <p style={styles.cardNumber}>{totalTasks}</p>
          </div>
          <div style={{...styles.card, borderTop: '4px solid #95a5a6'}}>
            <h3 style={styles.cardTitle}>Pending</h3>
            <p style={styles.cardNumber}>{pendingTasks}</p>
          </div>
          <div style={{...styles.card, borderTop: '4px solid #f39c12'}}>
            <h3 style={styles.cardTitle}>In Progress</h3>
            <p style={styles.cardNumber}>{inProgressTasks}</p>
          </div>
          <div style={{...styles.card, borderTop: '4px solid #27ae60'}}>
            <h3 style={styles.cardTitle}>Completed</h3>
            <p style={styles.cardNumber}>{completedTasks}</p>
          </div>
        </div>

        {/* Main Tabs */}
        <div style={styles.tabs}>
          <button 
            style={activeTab === 'tasks' ? {...styles.tab, ...styles.activeTab} : styles.tab}
            onClick={() => setActiveTab('tasks')}
          >
            My Tasks
          </button>
          <button 
            style={activeTab === 'projects' ? {...styles.tab, ...styles.activeTab} : styles.tab}
            onClick={() => setActiveTab('projects')}
          >
            My Projects
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'tasks' && (
          <div style={styles.tabContent}>
            <div style={styles.taskColumns}>
              <div style={styles.column}>
                <h3 style={styles.columnTitle}>Pending ({getTasksByStatus(individualTasks, 'Pending').length})</h3>
                <div style={styles.taskList}>
                  {getTasksByStatus(individualTasks, 'Pending').map(renderTaskCard)}
                </div>
              </div>
              <div style={styles.column}>
                <h3 style={styles.columnTitle}>In Progress ({getTasksByStatus(individualTasks, 'In Progress').length})</h3>
                <div style={styles.taskList}>
                  {getTasksByStatus(individualTasks, 'In Progress').map(renderTaskCard)}
                </div>
              </div>
              <div style={styles.column}>
                <h3 style={styles.columnTitle}>Completed ({getTasksByStatus(individualTasks, 'Completed').length})</h3>
                <div style={styles.taskList}>
                  {getTasksByStatus(individualTasks, 'Completed').map(renderTaskCard)}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div style={styles.tabContent}>
            {!selectedProject ? (
              <div style={styles.projectGrid}>
                {getUserProjects().map(project => (
                  <div key={project.id} style={styles.projectCard} onClick={() => setSelectedProject(project)}>
                    <h3 style={styles.projectName}>{project.name}</h3>
                    <p style={styles.projectDesc}>{project.description}</p>
                    <div style={styles.projectStats}>
                      <span>📋 {getProjectTasks(project.id).length} tasks</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button onClick={() => setSelectedProject(null)} style={styles.backBtn}>← Back</button>
                <h3 style={styles.projectDetailTitle}>{selectedProject.name}</h3>
                
                {/* Project Task Tabs */}
                <div style={styles.projectTabs}>
                  <button 
                    style={projectTab === 'Pending' ? {...styles.projectTab, ...styles.activeProjectTab} : styles.projectTab}
                    onClick={() => setProjectTab('Pending')}
                  >
                    Pending ({getTasksByStatus(getProjectTasks(selectedProject.id), 'Pending').length})
                  </button>
                  <button 
                    style={projectTab === 'In Progress' ? {...styles.projectTab, ...styles.activeProjectTab} : styles.projectTab}
                    onClick={() => setProjectTab('In Progress')}
                  >
                    In Progress ({getTasksByStatus(getProjectTasks(selectedProject.id), 'In Progress').length})
                  </button>
                  <button 
                    style={projectTab === 'Completed' ? {...styles.projectTab, ...styles.activeProjectTab} : styles.projectTab}
                    onClick={() => setProjectTab('Completed')}
                  >
                    Completed ({getTasksByStatus(getProjectTasks(selectedProject.id), 'Completed').length})
                  </button>
                </div>

                <div style={styles.projectTaskList}>
                  {getTasksByStatus(getProjectTasks(selectedProject.id), projectTab).map(renderTaskCard)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '#ecf0f1',
    padding: '2rem'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  title: {
    color: '#2c3e50',
    marginBottom: '0.5rem',
    textAlign: 'center'
  },
  roleTag: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '1rem',
    marginBottom: '2rem'
  },
  overviewCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    marginBottom: '2rem'
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  cardTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '0.9rem',
    color: '#7f8c8d'
  },
  cardNumber: {
    margin: 0,
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  tabs: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
    borderBottom: '2px solid #ddd'
  },
  tab: {
    padding: '0.75rem 2rem',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '3px solid transparent',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#7f8c8d',
    transition: 'all 0.3s'
  },
  activeTab: {
    color: '#3498db',
    borderBottom: '3px solid #3498db'
  },
  tabContent: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    minHeight: '400px'
  },
  taskColumns: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem'
  },
  column: {
    minHeight: '200px'
  },
  columnTitle: {
    color: '#2c3e50',
    fontSize: '1rem',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #ecf0f1'
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  taskCard: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '6px',
    border: '1px solid #dee2e6'
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  taskTitle: {
    margin: 0,
    fontSize: '0.95rem',
    color: '#2c3e50'
  },
  priority: {
    padding: '0.2rem 0.5rem',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: 'bold'
  },
  taskDesc: {
    fontSize: '0.8rem',
    color: '#7f8c8d',
    marginBottom: '0.5rem'
  },
  taskFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.75rem'
  },
  taskDate: {
    color: '#95a5a6'
  },
  statusSelect: {
    padding: '0.25rem 0.5rem',
    border: '1px solid #3498db',
    borderRadius: '4px',
    fontSize: '0.7rem',
    cursor: 'pointer'
  },
  projectGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem'
  },
  projectCard: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    border: '2px solid #dee2e6',
    transition: 'all 0.2s'
  },
  projectName: {
    color: '#2c3e50',
    marginBottom: '0.5rem',
    fontSize: '1.1rem'
  },
  projectDesc: {
    color: '#7f8c8d',
    fontSize: '0.85rem',
    marginBottom: '1rem'
  },
  projectStats: {
    color: '#3498db',
    fontSize: '0.85rem',
    fontWeight: 'bold'
  },
  backBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#95a5a6',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '1rem',
    fontSize: '0.9rem'
  },
  projectDetailTitle: {
    color: '#2c3e50',
    fontSize: '1.3rem',
    marginBottom: '1rem'
  },
  projectTabs: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  projectTab: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ecf0f1',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    color: '#7f8c8d'
  },
  activeProjectTab: {
    backgroundColor: '#3498db',
    color: '#fff'
  },
  projectTaskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  }
};

export default Dashboard;
