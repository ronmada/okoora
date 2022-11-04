import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/Interfaces';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  public findUser(userName: string): Observable<User | undefined> {
    return this.http
      .get<Array<User>>(`${environment.API}/users`)
      .pipe(
        map((userList: User[]) =>
          userList.find((user) => userName === user.username)
        )
      );
  }
}
