import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Welcome to Task Mate</h1>
        <p style={styles.subtitle}>A Role-Based Task Management System for Students and Company Teams</p>
        <p style={styles.description}>Streamline your workflow with organized task assignment, team collaboration, and progress tracking</p>
        <div style={styles.buttons}>
          <Link to="/login" style={{...styles.btn, ...styles.primaryBtn}}>Get Started</Link>
          <Link to="/register" style={{...styles.btn, ...styles.secondaryBtn}}>Sign Up</Link>
        </div>
      </div>
      <div style={styles.features}>
        <div style={styles.feature}>
          <h3>👥 Role-Based Access</h3>
          <p>Admin manages teams and assigns tasks, Users update their task status</p>
        </div>
        <div style={styles.feature}>
          <h3>📋 Task Assignment</h3>
          <p>Create tasks with priorities, deadlines, and assign to team members</p>
        </div>
        <div style={styles.feature}>
          <h3>👨‍💼 Team Management</h3>
          <p>Organize users into teams for better collaboration and tracking</p>
        </div>
        <div style={styles.feature}>
          <h3>📊 Progress Tracking</h3>
          <p>Monitor task status from Pending to In Progress to Completed</p>
        </div>
      </div>
      <div style={styles.note}>
        <p style={styles.noteText}>
          <strong>Note:</strong> Currently, the frontend is developed using React with mock data. 
          Backend services will be integrated in the next phase using Spring Boot REST APIs.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '#ecf0f1'
  },
  hero: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#3498db',
    color: '#fff'
  },
  title: {
    fontSize: '3rem',
    margin: '0 0 1rem 0'
  },
  subtitle: {
    fontSize: '1.25rem',
    marginBottom: '1rem'
  },
  description: {
    fontSize: '1.1rem',
    marginBottom: '2rem',
    maxWidth: '800px',
    margin: '0 auto 2rem'
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center'
  },
  btn: {
    padding: '0.75rem 2rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  primaryBtn: {
    backgroundColor: '#2c3e50',
    color: '#fff'
  },
  secondaryBtn: {
    backgroundColor: '#fff',
    color: '#3498db'
  },
  features: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  },
  feature: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  note: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem 4rem'
  },
  noteText: {
    backgroundColor: '#fff3cd',
    padding: '1.5rem',
    borderRadius: '8px',
    borderLeft: '4px solid #f39c12',
    color: '#856404',
    fontSize: '1rem',
    lineHeight: '1.6'
  }
};

export default Home;
