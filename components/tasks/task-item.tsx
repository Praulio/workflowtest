"use client";

import { Task } from '@/lib/types/task';
import { useTaskStore } from '@/lib/stores/task-store';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTaskStore();

  return (
    <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <Checkbox
        id={task.id}
        checked={task.completed}
        onCheckedChange={() => toggleTask(task.id)}
        className="h-5 w-5"
      />
      <label
        htmlFor={task.id}
        className={cn(
          "flex-1 cursor-pointer select-none",
          task.completed && "line-through text-gray-500"
        )}
      >
        {task.title}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Eliminar tarea</span>
      </Button>
    </div>
  );
}