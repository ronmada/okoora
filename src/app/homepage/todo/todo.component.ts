import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/shared/Interfaces';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Output() editTodoStatusEvent = new EventEmitter<Todo>();
  constructor(private http: HttpClient) {}

  public toggleTodoStatus(): void {
    this.http
      .patch<Todo>(`${environment.API}/todos/${this.todo.id}`, {
        completed: !this.todo.completed,
      })
      .subscribe((res: Todo) => {
        this.editTodoStatusEvent.emit(res);
      });
  }
}
