import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/shared/Interfaces';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo!: Todo;
  @Input() hideCompleted = false;
  constructor() {}

  ngOnInit(): void {}
}
