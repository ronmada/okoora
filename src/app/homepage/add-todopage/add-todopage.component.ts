import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/shared/Interfaces';
import { UserService } from 'src/app/shared/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-todopage',
  templateUrl: './add-todopage.component.html',
  styleUrls: ['./add-todopage.component.scss'],
})
export class AddTodopageComponent implements OnDestroy {
  public sub$!: Subscription;
  public todos!: Array<Todo>;
  public todoForm = this.fb.group({
    title: ['', [Validators.required]],
    completed: [false, [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private http: HttpClient
  ) {
    this.sub$ = this.userService.todosObs$.subscribe((todos) => {
      this.todos = todos;
    });
  }
  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
  public submitForm(): void {
    const formData = {
      title: this.todoForm.value.title,
      completed: this.todoForm.value.completed,
      userId: this.userService.getUser().id,
    };
    this.http
      .post<Todo>(`${environment.API}/todos`, formData)
      .subscribe((res: Todo) => {
        const copiedTodos = [...this.todos];
        copiedTodos.push(res);
        this.userService.setTodosObs$(copiedTodos);
      });
  }
}
