import { Task, DashboardStats } from './types';

const STORAGE_KEY = 'th09_tasks';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Hoàn thành dự án React',
    description: 'Xây dựng giao diện dashboard',
    status: 'inProgress',
    priority: 'high',
    deadline: '2026-05-15',
    tags: ['React', 'Frontend'],
    createdAt: '2026-05-06',
    updatedAt: '2026-05-06',
  },
  {
    id: '2',
    title: 'Viết documentation',
    description: 'Tài liệu API cho project',
    status: 'todo',
    priority: 'medium',
    deadline: '2026-05-20',
    tags: ['Documentation'],
    createdAt: '2026-05-06',
    updatedAt: '2026-05-06',
  },
  {
    id: '3',
    title: 'Fix bugs production',
    description: 'Sửa lỗi login issue',
    status: 'inProgress',
    priority: 'high',
    deadline: '2026-05-10',
    tags: ['Bug', 'Production'],
    createdAt: '2026-05-05',
    updatedAt: '2026-05-06',
  },
  {
    id: '4',
    title: 'Code review',
    description: 'Review pull request từ team',
    status: 'done',
    priority: 'medium',
    deadline: '2026-05-08',
    tags: ['Review'],
    createdAt: '2026-05-04',
    updatedAt: '2026-05-06',
  },
  {
    id: '5',
    title: 'Deploy to staging',
    description: 'Deploy version 1.2.0',
    status: 'done',
    priority: 'high',
    deadline: '2026-05-06',
    tags: ['Deploy'],
    createdAt: '2026-05-01',
    updatedAt: '2026-05-06',
  },
];

class TaskService {
  getTasks(): Task[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : mockTasks;
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const tasks = this.getTasks();
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    tasks.push(newTask);
    this.saveTasks(tasks);
    return newTask;
  }

  updateTask(id: string, updates: Partial<Task>): Task | null {
    const tasks = this.getTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    tasks[index] = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    this.saveTasks(tasks);
    return tasks[index];
  }

  deleteTask(id: string): boolean {
    const tasks = this.getTasks();
    const filtered = tasks.filter((t) => t.id !== id);
    if (filtered.length === tasks.length) return false;
    this.saveTasks(filtered);
    return true;
  }

  moveTask(taskId: string, newStatus: string): Task | null {
    return this.updateTask(taskId, { status: newStatus as any });
  }

  getDashboardStats(): DashboardStats {
    const tasks = this.getTasks();
    const today = new Date().toISOString().split('T')[0];
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.status === 'done').length,
      overdue: tasks.filter(
        (t) => t.status !== 'done' && t.deadline < today
      ).length,
    };
  }
}

export const tasksService = new TaskService();
