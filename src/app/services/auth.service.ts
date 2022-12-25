import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public eventSession: EventEmitter<boolean> = new EventEmitter<boolean>();
  private endPoint: string = environment.endPoint;
  private _registerUrl = this.endPoint + "/users";
  private _loginUrl = this.endPoint + "/auth/login";

  constructor(private http: HttpClient) { }

  registerUser(userEntry: User): Observable<User> {
    return this.http.post<User>(this._registerUrl, userEntry);
  }

  loginUser(loginEntry: any): Observable<any> {
    return this.http.post<any>(this._loginUrl, loginEntry);
  }

  logout() {
    this.eventSession.emit(false);
  }
}
