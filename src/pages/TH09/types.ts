export type TaskStatus = 'todo' | 'inProgress' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string; // ISO date string
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  total: number;
  completed: number;
  overdue: number;
}

export interface TaskFilters {
  status: TaskStatus | 'all';
  search: string;
}
