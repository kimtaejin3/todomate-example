export interface Todo {
  id: string;
  goalId: string;
  content: string;
  isCompleted: boolean;
  date: string; // "YYYY-MM-DD"
}

export interface Goal {
  id: string;
  name: string;
  color: string;
}
