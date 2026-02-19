import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import { useProject } from '../context/ProjectContext';
import { dummyUsers } from '../data/dummyData';

const Tasks = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, isAdmin } = useAuth();
  const { tasks, addTask, updateTaskStatus, deleteTask, getTasksByUser } = useTask();
  const { projects } = useProject();
  const [showModal, setShowModal] = useState(false);
  const [taskType, setTaskType] = useState('individual');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
    assignedTo: '',
    projectId: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const displayTasks = isAdmin() ? tasks : getTasksByUser(currentUser?.id);

  const handleStatusChange = (taskId, newStatus) => {
    updateTaskStatus(taskId, newStatus);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      ...formData,
      assignedTo: parseInt(formData.assignedTo),
      createdBy: currentUser.id,
      type: taskType
    };
    if (taskType === 'group') {
      newTask.projectId = parseInt(formData.projectId);
    }
    addTask(newTask);
    setShowModal(false);
    setFormData({ title: '', description: '', status: 'Pending', priority: 'Medium', dueDate: '', assignedTo: '', projectId: '' });
    setTaskType('individual');
  };

  const handleAddNew = (type) => {
    setTaskType(type);
    setFormData({ title: '', description: '', status: 'Pending', priority: 'Medium', dueDate: '', assignedTo: '', projectId: '' });
    setShowModal(true);
  };

  const getUserName = (userId) => {
    const user = dummyUsers.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown';
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>{isAdmin() ? 'All Tasks' : 'My Tasks'}</h1>
          {isAdmin() && (
            <div style={styles.buttonGroup}>
              <button onClick={() => handleAddNew('individual')} style={styles.addButton}>+ Create Task</button>
              <button onClick={() => handleAddNew('group')} style={{...styles.addButton, backgroundColor: '#9b59b6'}}>+ Create Group Task</button>
            </div>
          )}
        </div>
        <div style={styles.taskList}>
          {displayTasks.length === 0 ? (
            <p style={styles.noTasks}>No tasks available</p>
          ) : (
            displayTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                isAdmin={isAdmin()}
                userName={getUserName(task.assignedTo)}
                createdByName={getUserName(task.createdBy)}
                projectName={task.type === 'group' ? getProjectName(task.projectId) : null}
              />
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Create {taskType === 'individual' ? 'Individual' : 'Group'} Task</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  style={{...styles.input, minHeight: '80px'}}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  style={styles.input}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              {taskType === 'group' && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Project</label>
                  <select
                    value={formData.projectId}
                    onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                    style={styles.input}
                    required
                  >
                    <option value="">Select Project</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <div style={styles.formGroup}>
                <label style={styles.label}>Assign To</label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                  style={styles.input}
                  required
                >
                  <option value="">Select User</option>
                  {dummyUsers.filter(u => u.role === 'User').map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.modalActions}>
                <button type="submit" style={{...styles.btn, ...styles.saveBtn}}>Create Task</button>
                <button type="button" onClick={() => setShowModal(false)} style={{...styles.btn, ...styles.cancelBtn}}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  title: {
    color: '#2c3e50',
    margin: 0
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem'
  },
  addButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column'
  },
  noTasks: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '1.2rem',
    padding: '3rem'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  modalTitle: {
    color: '#2c3e50',
    marginBottom: '1.5rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '0.5rem',
    color: '#2c3e50',
    fontWeight: 'bold'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  modalActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  btn: {
    flex: 1,
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  saveBtn: {
    backgroundColor: '#3498db',
    color: '#fff'
  },
  cancelBtn: {
    backgroundColor: '#95a5a6',
    color: '#fff'
  }
};

export default Tasks;
