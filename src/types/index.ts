export interface Todo {
  id: number;
  goalId: number;
  content: string;
  isCompleted: boolean;
  date: string; // "YYYY-MM-DD"
}

export interface Goal {
  id: number;
  name: string;
  color: string;
}
