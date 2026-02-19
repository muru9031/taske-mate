import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTeam } from '../context/TeamContext';
import { dummyUsers } from '../data/dummyData';

const Teams = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, isAdmin } = useAuth();
  const { teams, createTeam, addMemberToTeam } = useTeam();
  const [showModal, setShowModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleCreateTeam = (e) => {
    e.preventDefault();
    createTeam(teamName, selectedMembers, currentUser.id);
    setShowModal(false);
    setTeamName('');
    setSelectedMembers([]);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    addMemberToTeam(selectedTeam.id, parseInt(selectedMember));
    setShowAddMemberModal(false);
    setSelectedMember('');
  };

  const toggleMember = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const getUserName = (userId) => {
    const user = dummyUsers.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  const getAvailableMembers = (team) => {
    return dummyUsers.filter(u => u.role === 'User' && !team.members.includes(u.id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Team Management</h1>
          <button onClick={() => setShowModal(true)} style={styles.addButton}>+ Create Team</button>
        </div>
        <div style={styles.teamGrid}>
          {teams.map(team => (
            <div key={team.id} style={styles.teamCard}>
              <h3 style={styles.teamName}>{team.name}</h3>
              <p style={styles.teamInfo}>Created: {team.createdAt}</p>
              <div style={styles.membersSection}>
                <h4 style={styles.membersTitle}>Members ({team.members.length})</h4>
                <ul style={styles.membersList}>
                  {team.members.map(memberId => (
                    <li key={memberId} style={styles.memberItem}>
                      {getUserName(memberId)}
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => {
                  setSelectedTeam(team);
                  setShowAddMemberModal(true);
                }}
                style={styles.addMemberBtn}
              >
                + Add Member
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Create New Team</h2>
            <form onSubmit={handleCreateTeam} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Team Name</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Select Members</label>
                <div style={styles.checkboxGroup}>
                  {dummyUsers.filter(u => u.role === 'User').map(user => (
                    <label key={user.id} style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(user.id)}
                        onChange={() => toggleMember(user.id)}
                        style={styles.checkbox}
                      />
                      {user.name}
                    </label>
                  ))}
                </div>
              </div>
              <div style={styles.modalActions}>
                <button type="submit" style={{...styles.btn, ...styles.saveBtn}}>Create</button>
                <button type="button" onClick={() => setShowModal(false)} style={{...styles.btn, ...styles.cancelBtn}}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddMemberModal && selectedTeam && (
        <div style={styles.modalOverlay} onClick={() => setShowAddMemberModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Add Member to {selectedTeam.name}</h2>
            <form onSubmit={handleAddMember} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Select Member</label>
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  style={styles.input}
                  required
                >
                  <option value="">Choose a member</option>
                  {getAvailableMembers(selectedTeam).map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>
              <div style={styles.modalActions}>
                <button type="submit" style={{...styles.btn, ...styles.saveBtn}}>Add</button>
                <button type="button" onClick={() => setShowAddMemberModal(false)} style={{...styles.btn, ...styles.cancelBtn}}>Cancel</button>
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
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem'
  },
  teamCard: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  teamName: {
    color: '#2c3e50',
    marginBottom: '0.5rem'
  },
  teamInfo: {
    color: '#7f8c8d',
    fontSize: '0.9rem',
    marginBottom: '1rem'
  },
  membersSection: {
    marginBottom: '1rem'
  },
  membersTitle: {
    color: '#34495e',
    fontSize: '1rem',
    marginBottom: '0.5rem'
  },
  membersList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  memberItem: {
    padding: '0.5rem',
    backgroundColor: '#ecf0f1',
    marginBottom: '0.5rem',
    borderRadius: '4px',
    color: '#2c3e50'
  },
  addMemberBtn: {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
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
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    maxHeight: '200px',
    overflow: 'auto',
    padding: '0.5rem',
    border: '1px solid #bdc3c7',
    borderRadius: '4px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer'
  },
  checkbox: {
    cursor: 'pointer'
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

export default Teams;
