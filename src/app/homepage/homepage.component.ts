import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo, User } from '../shared/Interfaces';
import { UserService } from '../shared/user.service';
const SHOW_AMOUNT_LIST = [5, 10, 20];

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  public user: User = this.userService.getUser();
  public todos: Array<Todo> = [];
  public page = 1;
  public chosenShowAmount = SHOW_AMOUNT_LIST[0];
  public loadingTodos = false;
  public hideCompleted = false;
  public todosFilterd: Array<Todo> = [];
  public pagesNumbersArray: Array<number> = [];
  get SHOW_AMOUNT_LIST(): Array<number> {
    return SHOW_AMOUNT_LIST;
  }
  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    console.log(this.user);
    this.loadingTodos = true;
    this.http
      .get<Array<Todo>>(`${environment.API}/users/${this.user.id}/todos`)
      .subscribe((todos: Array<Todo>) => {
        this.todos = [...todos];
        this.todosFilterd = [...todos];
        this.defineNumberOfPages(
          this.todosFilterd.length,
          this.chosenShowAmount
        );
        this.loadingTodos = false;
        this.userService.setTodos(todos);
        console.log(todos);
      });
    // this.todos$ = this.http.get<Array<Todo>>(
    //   `${environment.API}/users/${this.user.id}/todos`
    // );
  }
  // public choosePage(page: number): void {
  //   this.page = page;
  // }
  // public chooseShowAmount(chosenShowAmount: number): void {
  //   this.chosenShowAmount = chosenShowAmount;
  // }
  public toggleTodoVisibillity(): void {
    this.hideCompleted = !this.hideCompleted;
    if (this.hideCompleted) this.getCompletedTodos(this.todos);
    else this.todosFilterd = [...this.todos];
    this.defineNumberOfPages(this.todosFilterd.length, this.chosenShowAmount);
  }
  private getCompletedTodos(todos: Array<Todo>) {
    this.todosFilterd = todos.filter((todo: Todo) => todo.completed === true);
  }

  public choosePage(page: number): void {
    this.page = page;
  }
  public chooseShowAmount(chosenShowAmount: number): void {
    this.chosenShowAmount = chosenShowAmount;
    this.defineNumberOfPages(this.todosFilterd.length, this.chosenShowAmount);
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
