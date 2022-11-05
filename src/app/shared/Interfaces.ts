export interface User {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}
export interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}
