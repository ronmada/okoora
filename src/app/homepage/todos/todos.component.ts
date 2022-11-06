import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Todo, User } from 'src/app/shared/Interfaces';
import { UserService } from 'src/app/shared/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private http: HttpClient, private userService: UserService) {}
  public user: User = this.userService.getUser();
  public todos: Array<Todo> = [];
  public completedTodos: Array<Todo> = [];
  public unCompletedTodos: Array<Todo> = [];
  public currentTodos = [...this.todos];
  ngOnInit(): void {
    this.http
      .get<Array<Todo>>(`${environment.API}/users/${this.user.id}/todos`)
      .subscribe((todos) => (this.todos = todos));
    this.completedTodos = this.getCompletedTodos();
    this.unCompletedTodos = this.getUncompletedTodos();
  }
  public showCompleted(): void {
    // console.log(this.todos$.subscribe((x) => console.log(x)));
    this.currentTodos = this.getCompletedTodos();
  }
  private getCompletedTodos(): Array<Todo> {
    return this.todos.filter((todo) => todo.completed === true);
  }
  private getUncompletedTodos(): Array<Todo> {
    return this.todos.filter((todo) => todo.completed === false);
  }
}
// public replaceTodo() {
//   const todos$;
// }
