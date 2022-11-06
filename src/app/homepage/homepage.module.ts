import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { PagingComponent } from './paging/paging.component';
import { TodoComponent } from './todo/todo.component';
import { TodosComponent } from './todos/todos.component';

@NgModule({
  declarations: [HomepageComponent, PagingComponent, TodoComponent, TodosComponent],
  imports: [CommonModule],
})
export class HomepageModule {}
