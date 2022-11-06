import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { TodoComponent } from './todo/todo.component';
import { AddTodopageComponent } from './add-todopage/add-todopage.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomepageComponent,
    TodoComponent,
    AddTodopageComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class HomepageModule {}
