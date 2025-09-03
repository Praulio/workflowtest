# Technical Architecture

## Frontend Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn/ui
- **State**: Zustand for local state
- **Storage**: IndexedDB via Dexie.js
- **Animations**: Framer Motion

## Data Schema
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  categoryId?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  position: number;
}

interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
}
```