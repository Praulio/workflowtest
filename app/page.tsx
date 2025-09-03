import { TaskForm } from '@/components/tasks/task-form';
import { TaskList } from '@/components/tasks/task-list';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            TaskFlow
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona tus tareas de forma simple y efectiva
          </p>
        </header>

        {/* Task Form */}
        <div className="mb-8">
          <TaskForm />
        </div>

        {/* Task List */}
        <TaskList />
      </div>
    </main>
  );
}
