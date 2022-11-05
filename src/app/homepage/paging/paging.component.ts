import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/shared/Interfaces';
const SHOW_AMOUNT_LIST = [5, 10, 20];
@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss'],
})
export class PagingComponent implements OnInit {
  @Input() page!: number;
  @Input() chosenShowAmount!: number;
  @Input() todosFilterd!: Array<Todo>;
  @Output() chooseShowAmountEvent = new EventEmitter<number>();
  @Output() choosePageEvent = new EventEmitter<number>();
  public pagesNumbersArray: Array<number> = [];
  get SHOW_AMOUNT_LIST(): Array<number> {
    return SHOW_AMOUNT_LIST;
  }
  ngOnInit(): void {
    this.defineNumberOfPages(this.todosFilterd.length, this.chosenShowAmount);
  }
  public choosePage(page: number): void {
    this.choosePageEvent.emit(page);
  }
  public chooseShowAmount(chosenShowAmount: number): void {
    this.chosenShowAmount = chosenShowAmount;
    this.chooseShowAmountEvent.emit(chosenShowAmount);
    this.defineNumberOfPages(this.todosFilterd.length, this.chosenShowAmount);
    if (this.chosenShowAmount * this.page >= this.todosFilterd.length)
      this.choosePageEvent.emit(1);
  }
  private defineNumberOfPages(
    todosLength: number,
    chosenShowAmount: number
  ): void {
    const pagesAmount = Math.ceil(todosLength / chosenShowAmount);
    this.pagesNumbersArray = [];
    for (let i = 1; i <= pagesAmount; i++) {
      this.pagesNumbersArray.push(i);
    }
  }
}
