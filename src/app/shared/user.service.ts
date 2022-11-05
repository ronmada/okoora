import { Injectable } from '@angular/core';
import { User } from './Interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user!: User;
  setUser(user: User): void {
    this.user = user;
  }
  getUser(): User {
    return this.user;
  }
}
