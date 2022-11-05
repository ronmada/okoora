import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}
  public canActivate(): boolean {
    if (this.userService.getUser()) return true;
    this.router.navigate(['login']);
    return false;
  }
}
