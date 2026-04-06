export interface Task {
  id: string;
  title: string;
  completed: boolean;
  list: 'today' | 'later';
  createdAt: string;
  date?: string; // YYYY-MM-DD for tasks assigned to a specific day
  color?: string;
  order: number; // for manual sorting
}

export interface TimeBlock {
  id: string;
  taskId: string | null;
  title?: string;
  startTime: string; // ISO string for the specific day/time
  endTime: string;
  color?: string;
}

export interface AppState {
  tasks: Task[];
  timeBlocks: TimeBlock[];
  notes: Record<string, string>; // date -> content
  selectedDate: string; // YYYY-MM-DD
}
