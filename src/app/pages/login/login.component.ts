import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private router: Router,
    private _auth: AuthService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar) {
    this.formLogin = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  ngOnInit() {

  }

  showSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  loginUser() {
    const loginEntry = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    };

    this._auth.loginUser(loginEntry).subscribe((res: any) => {
      console.log(res);
      if(res.data.isValid == 1) {
        this._auth.eventSession.emit(true);
        this.showSnackBar("Usuario logueado", "OK");
        this.router.navigate(['/']);
      } else {
        this.showSnackBar("Correo y/o contraseña incorrectos", "OK");
      }
    })
  }

}
