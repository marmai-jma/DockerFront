import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../shared-data/user-dto';
import { map } from 'rxjs/operators';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  globals: Globals;
  url: string;

  constructor(private http: HttpClient,
              globals: Globals,
              ) {this.globals = globals;
   }


  // get all
  getUsers(): Observable<UserDto[]> {
    this.url = this.globals.BACKEND_URL;
    return this.http.get(`${this.url}/users`)
      .pipe(
        map((jsonUsers: any[]) => jsonUsers.map(jsonUser => new UserDto(jsonUser)))
      );
  }

  // get par Id
  getOneUser(userLoginId: any): Observable<UserDto> {
    this.url = this.globals.BACKEND_URL;
    return this.http.get(`${this.url}/users/login/${userLoginId}`)
      .pipe(
        map(jsonUser => new UserDto(jsonUser)));
  }

  // get par login
  getOneUserByLogin(userLogin: any): Observable<UserDto> {
    this.url = this.globals.BACKEND_URL;
    return this.http.get(`${this.url}/users/login/${userLogin}`)
      .pipe(
        map(jsonUser => new UserDto(jsonUser)));
  }

  // post new Id
  postUser(id: string,
           login: string,
           password: string,
           userName: string,
           userSurname: string,
           avatarImageURL: string,
           email: string): Observable<any> {
            this.url = this.globals.BACKEND_URL;
            return this.http.post(`${this.url}/users`, {
      // tslint:disable-next-line: object-literal-key-quotes
      'id': id,
      'login': login,
      'password': password,
      'userName': userName,
      'userSurname': userSurname,
      'avatarImageURL': avatarImageURL,
      'email': email })
      .pipe(
        map((result: any) => new UserDto(result)),
      );
  }

  // del par Id
  deleteUser(userId: string): Observable<any> {
    this.url = this.globals.BACKEND_URL;
    return this.http.delete(`${this.url}/users/${userId}`);
  }



}
