const TaskCard = ({ task, onEdit, onDelete, onStatusChange, isAdmin, userName, createdByName, projectName }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#e74c3c';
      case 'Medium': return '#f39c12';
      case 'Low': return '#3498db';
      default: return '#95a5a6';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#27ae60';
      case 'In Progress': return '#f39c12';
      case 'Pending': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{task.title}</h3>
        <span style={{...styles.priority, backgroundColor: getPriorityColor(task.priority)}}>
          {task.priority}
        </span>
      </div>
      <p style={styles.description}>{task.description}</p>
      <div style={styles.info}>
        <span style={styles.infoItem}><strong>Type:</strong> {task.type === 'individual' ? 'Individual' : 'Group'}</span>
        {projectName && <span style={styles.infoItem}><strong>Project:</strong> {projectName}</span>}
        <span style={styles.infoItem}><strong>Assigned To:</strong> {userName}</span>
        <span style={styles.infoItem}><strong>Created By:</strong> {createdByName}</span>
      </div>
      <div style={styles.footer}>
        <span style={{...styles.status, backgroundColor: getStatusColor(task.status)}}>
          {task.status}
        </span>
        <span style={styles.date}>Due: {task.dueDate}</span>
      </div>
      <div style={styles.actions}>
        {isAdmin ? (
          <button onClick={() => onDelete(task.id)} style={{...styles.btn, ...styles.deleteBtn}}>Delete</button>
        ) : (
          <select 
            value={task.status} 
            onChange={(e) => onStatusChange(task.id, e.target.value)}
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
};

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '1rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    color: '#2c3e50'
  },
  priority: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '0.875rem',
    fontWeight: 'bold'
  },
  description: {
    color: '#7f8c8d',
    marginBottom: '1rem',
    lineHeight: '1.5'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1rem',
    padding: '0.75rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
  },
  infoItem: {
    color: '#2c3e50',
    fontSize: '0.9rem'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  status: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '0.875rem'
  },
  date: {
    color: '#95a5a6',
    fontSize: '0.875rem'
  },
  actions: {
    display: 'flex',
    gap: '0.5rem'
  },
  btn: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 'bold'
  },
  editBtn: {
    backgroundColor: '#3498db',
    color: '#fff'
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff'
  },
  statusSelect: {
    padding: '0.5rem 1rem',
    border: '2px solid #3498db',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#fff',
    color: '#2c3e50'
  }
};

export default TaskCard;
