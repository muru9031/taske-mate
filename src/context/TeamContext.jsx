import { createContext, useState, useContext } from 'react';
import { dummyTeams } from '../data/dummyData';

const TeamContext = createContext();

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within TeamProvider');
  }
  return context;
};

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState(dummyTeams);

  const createTeam = (name, members, createdBy) => {
    const newTeam = {
      id: teams.length + 1,
      name,
      members,
      createdBy,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTeams([...teams, newTeam]);
  };

  const addMemberToTeam = (teamId, memberId) => {
    setTeams(teams.map(team => 
      team.id === teamId 
        ? { ...team, members: [...team.members, memberId] }
        : team
    ));
  };

  return (
    <TeamContext.Provider value={{ teams, createTeam, addMemberToTeam }}>
      {children}
    </TeamContext.Provider>
  );
};
