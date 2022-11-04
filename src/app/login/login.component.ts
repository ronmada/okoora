import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/Interfaces';
import { SessionStorageService } from '../shared/session-storage.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public badUsername = false;
  public submitted = false;
  public submittedUserName = '';
  public loginForm = this.fb.group({
    userName: ['', [Validators.required]],
  });
  get userName() {
    return this.loginForm.get('userName');
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private sessionStorageService: SessionStorageService
  ) {}

  public login(): void {
    this.submitted = true;
    this.submittedUserName = this.userName?.value as string;
    this.validateUser(this.userName?.value as string);
  }
  private validateUser(userName: string): void {
    this.loginService.findUser(userName).subscribe((user: User | undefined) => {
      if (user !== undefined) {
        this.sessionStorageService.setItem('userID', user.id.toString());
        this.router.navigate(['homepage']);
      } else {
        this.badUsername = true;
      }
    });
  }
}
