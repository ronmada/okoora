import { Injectable } from '@angular/core';
import { Todo, User } from './Interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user!: User;
  private todos: Array<Todo> = [];
  setUser(user: User): void {
    this.user = user;
  }
  public getUser(): User {
    return this.user;
  }
  public getUserTodos(): Array<Todo> {
    return this.todos;
  }
  public setTodos(todos: Array<Todo>): void {
    this.todos = todos;
  }
}
