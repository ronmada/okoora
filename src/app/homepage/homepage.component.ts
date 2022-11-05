import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo, User } from '../shared/Interfaces';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  public user: User = this.userService.getUser();
  // public todos$!: Observable<Array<Todo>>;
  public todos: Array<Todo> = [];
  public page = 1;
  public pagesNumbersArray: Array<number> = [];
  public showAmountList = [5, 10, 20];
  public chosenShowAmount = this.showAmountList[0];
  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    console.log(this.user);
    this.http
      .get<Array<Todo>>(`${environment.API}/users/${this.user.id}/todos`)
      .subscribe((todos) => {
        this.todos = todos;
        this.defineNumberOfPages(this.todos.length, this.chosenShowAmount);
        console.log(todos);
      });
    // this.todos$ = this.http.get<Array<Todo>>(
    //   `${environment.API}/users/${this.user.id}/todos`
    // );
  }
  public choosePage(page: number): void {
    this.page = page;
  }
  public chooseShowAmount(chosenShowAmount: number): void {
    this.chosenShowAmount = chosenShowAmount;
    if (this.chosenShowAmount * this.page >= this.todos.length) this.page = 1;
    this.defineNumberOfPages(this.todos.length, this.chosenShowAmount);
  }
  private defineNumberOfPages(todosLength: number, chosenShowAmount: number) {
    const pagesAmount = Math.ceil(todosLength / chosenShowAmount);
    this.pagesNumbersArray = [];
    for (let i = 1; i <= pagesAmount; i++) {
      this.pagesNumbersArray.push(i);
    }
  }
}
