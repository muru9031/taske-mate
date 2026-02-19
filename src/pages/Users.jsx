import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dummyUsers } from '../data/dummyData';

const Users = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const filteredUsers = dummyUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Registered Users</h1>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.userGrid}>
          {filteredUsers.map(user => (
            <div key={user.id} style={styles.userCard}>
              <div style={styles.userHeader}>
                <h3 style={styles.userName}>{user.name}</h3>
                <span style={{
                  ...styles.roleBadge,
                  backgroundColor: user.role === 'Admin' ? '#e74c3c' : '#3498db'
                }}>
                  {user.role}
                </span>
              </div>
              <p style={styles.userEmail}>{user.email}</p>
              <p style={styles.userId}>ID: {user.id}</p>
            </div>
          ))}
        </div>
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
    marginBottom: '2rem',
    textAlign: 'center'
  },
  searchBox: {
    marginBottom: '2rem'
  },
  searchInput: {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    border: '2px solid #bdc3c7',
    borderRadius: '8px',
    outline: 'none'
  },
  userGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem'
  },
  userCard: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  userHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  userName: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '1.1rem'
  },
  roleBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  userEmail: {
    color: '#7f8c8d',
    marginBottom: '0.5rem'
  },
  userId: {
    color: '#95a5a6',
    fontSize: '0.9rem',
    margin: 0
  }
};

export default Users;
