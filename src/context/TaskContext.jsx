import { createContext, useState, useContext } from 'react';
import { dummyTasks } from '../data/dummyData';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(dummyTasks);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: tasks.length + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getTasksByUser = (userId) => {
    return tasks.filter(task => task.assignedTo === userId);
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      updateTaskStatus, 
      deleteTask, 
      getTasksByUser 
    }}>
      {children}
    </TaskContext.Provider>
  );
};
