import { EventEmitter, Injectable } from '@angular/core';
import { Http, HttpOptions } from '@capacitor-community/http';
import { from } from 'rxjs';
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

  constructor() { }

  registerUser(userEntry: User) {
    const url = this._registerUrl;
    const options: HttpOptions = {
      url,
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: JSON.stringify(userEntry)
    }
    return from (Http.post(options));
  }

  loginUser(userEntry: any) {
    const url = this._loginUrl;
    const options: HttpOptions = {
      url,
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: JSON.stringify(userEntry)
    }
    return from (Http.post(options));
  }

  logout() {
    this.eventSession.emit(false);
  }
}
