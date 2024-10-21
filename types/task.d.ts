interface AddNewTask {
  description: string;
  date: Date;
}

interface AddTask {
  isVisible: boolean;
  onCancel: () => void;
  onSave: (task: AddNewTask) => Promise<void>;
}

interface Task {
  id: number;
  description: string;
  estimateAt: Date;
  doneAt?: Date;
  onToggleTask: (id: number) => Promise<void>;
  onDelete: (id: number) => void;
}

interface TaskList {
  title: string;
  daysAhead: number;
  navigation: any;
}
