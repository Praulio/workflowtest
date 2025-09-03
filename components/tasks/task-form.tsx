"use client";

import { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useTaskStore } from '@/lib/stores/task-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function TaskForm() {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const addTask = useTaskStore((state) => state.addTask);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title);
      setTitle('');
      // Keep focus on input for continuous task creation
      inputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl mx-auto">
      <Input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="¿Qué necesitas hacer?"
        className="flex-1"
        autoFocus
      />
      <Button type="submit" size="icon">
        <Plus className="h-4 w-4" />
        <span className="sr-only">Agregar tarea</span>
      </Button>
    </form>
  );
}