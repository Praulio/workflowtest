"use client";

import { useEffect } from 'react';
import { useTaskStore } from '@/lib/stores/task-store';
import { TaskItem } from './task-item';
import { CheckCircle2 } from 'lucide-react';

export function TaskList() {
  const { tasks, isLoading, loadTasks } = useTaskStore();

  // Load tasks from localStorage on mount
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">
        Cargando tareas...
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No hay tareas pendientes</p>
        <p className="text-gray-400 text-sm mt-2">
          Crea tu primera tarea usando el formulario de arriba
        </p>
      </div>
    );
  }

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      {/* Active tasks */}
      {activeTasks.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Pendientes ({activeTasks.length})
          </h2>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            {activeTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {/* Completed tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Completadas ({completedTasks.length})
          </h2>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 opacity-75">
            {completedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}