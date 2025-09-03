import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@/lib/types/task';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  
  // Actions
  loadTasks: () => void;
  addTask: (title: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  clearCompleted: () => void;
}

// localStorage helper functions
const STORAGE_KEY = 'taskflow_tasks';

const loadFromStorage = (): Task[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
  }
  return [];
};

const saveToStorage = (tasks: Task[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isLoading: true,

  loadTasks: () => {
    const tasks = loadFromStorage();
    set({ tasks, isLoading: false });
  },

  addTask: (title: string) => {
    if (!title.trim()) return;
    
    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => {
      const updatedTasks = [newTask, ...state.tasks];
      saveToStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  },

  updateTask: (id: string, updates: Partial<Task>) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      );
      saveToStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  },

  deleteTask: (id: string) => {
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      saveToStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  },

  toggleTask: (id: string) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      );
      saveToStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  },

  clearCompleted: () => {
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => !task.completed);
      saveToStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  },
}));