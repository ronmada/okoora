import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { PagingComponent } from './paging/paging.component';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [HomepageComponent, PagingComponent, TodoComponent],
  imports: [CommonModule],
})
export class HomepageModule {}
