import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo, User } from '../shared/Interfaces';
import { UserService } from '../shared/user.service';
const SHOW_AMOUNT_LIST = [5, 10, 20];
type ToggleTodosShown = 'showAll' | 'showCompletedOnly' | 'showUncompletedOnly';
const stateManager: Array<{
  state: ToggleTodosShown;
  msg: string;
  id: number;
}> = [
  { state: 'showAll', msg: 'All', id: 0 },
  { state: 'showCompletedOnly', msg: 'Completed', id: 1 },
  { state: 'showUncompletedOnly', msg: 'Uncompleted', id: 2 },
];
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  public sub$!: Subscription;
  public user: User = this.userService.getUser();
  public todos: Array<Todo> = [];
  public page = 1;
  public chosenShowAmount = SHOW_AMOUNT_LIST[0];
  public loadingTodos = true;
  public todosState = stateManager[0];
  public todosFilterd: Array<Todo> = [];
  public pagesNumbersArray: Array<number> = [];

  get SHOW_AMOUNT_LIST(): Array<number> {
    return SHOW_AMOUNT_LIST;
  }
  get completedTodosAmount(): number {
    return this.getCompletedTodos(this.todos).length;
  }
  constructor(private userService: UserService, private http: HttpClient) {
    this.sub$ = this.userService.todosObs$.subscribe(
      (todos) => (this.todos = todos)
    );
  }
  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
  ngOnInit(): void {
    if (this.todos.length === 0) {
      this.http
        .get<Array<Todo>>(`${environment.API}/users/${this.user.id}/todos`)
        .subscribe((todos: Array<Todo>) => {
          this.userService.setTodosObs$(todos);
          this.setup(this.todos);
        });
    } else this.setup(this.todos);
  }

  public changeTodoState(): void {
    this.page = 1;
    let stateManagerIndex = this.todosState.id + 1;
    if (stateManagerIndex === stateManager.length) stateManagerIndex = 0;
    this.toggleTodoVisibillity(stateManagerIndex);
  }

  public choosePage(page: number): void {
    this.page = page;
  }
  public chooseShowAmount(chosenShowAmount: number): void {
    this.chosenShowAmount = chosenShowAmount;
    this.defineNumberOfPages(this.todosFilterd.length, this.chosenShowAmount);
  }

  public editTodoStatus(todo: Todo): void {
    let index = this.todos.findIndex((todoMain) => todo.id === todoMain.id);
    const todosTemp = [...this.todos];
    todosTemp[index] = todo;
    this.userService.setTodosObs$(todosTemp);
    index = this.todosFilterd.findIndex((todoMain) => todo.id === todoMain.id);
    this.todosFilterd[index] = todo;
    this.toggleTodoVisibillity(this.todosState.id);
  }
  public trackByFn(_index: number, item: Todo): number {
    return item.id;
  }
  private setup(todos: Array<Todo>): void {
    this.loadingTodos = false;
    this.todosFilterd = [...todos];
    this.defineNumberOfPages(this.todosFilterd.length, this.chosenShowAmount);
  }
  private toggleTodoVisibillity(stateManagerIndex: number): void {
    this.todosState = stateManager[stateManagerIndex];
    switch (this.todosState.state) {
      case 'showCompletedOnly':
        this.todosFilterd = this.getCompletedTodos(this.todos);
        break;
      case 'showUncompletedOnly':
        this.todosFilterd = this.getUnCompletedTodos(this.todos);
        break;
      case 'showAll':
        this.todosFilterd = [...this.todos];
        break;
    }
    this.defineNumberOfPages(this.todosFilterd.length, this.chosenShowAmount);
  }
  private getUnCompletedTodos(todos: Array<Todo>): Array<Todo> {
    return todos.filter((todo: Todo) => todo.completed === false);
  }
  private getCompletedTodos(todos: Array<Todo>): Array<Todo> {
    return todos.filter((todo: Todo) => todo.completed === true);
  }
  private defineNumberOfPages(
    todosLength: number,
    chosenShowAmount: number
  ): void {
    if (this.chosenShowAmount * this.page >= this.todosFilterd.length)
      this.page = 1;
    const pagesAmount = Math.ceil(todosLength / chosenShowAmount);
    this.pagesNumbersArray = [];
    for (let i = 1; i <= pagesAmount; i++) {
      this.pagesNumbersArray.push(i);
    }
  }
}
