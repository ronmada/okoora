import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo, User } from './Interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user!: User;
  private todosObs = new BehaviorSubject<Array<Todo>>([]);

  setUser(user: User): void {
    this.user = user;
  }
  public getUser(): User {
    return this.user;
  }

  get todosObs$(): Observable<Array<Todo>> {
    return this.todosObs.asObservable();
  }
  public setTodosObs$(todos: Array<Todo>) {
    this.todosObs.next(todos);
  }
}
