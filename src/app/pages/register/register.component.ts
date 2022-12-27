import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;

  constructor(
    private router: Router,
    private _auth: AuthService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar) {
    this.formRegister = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  ngOnInit() {}

  registerUser() {
    const userEntry: User = {
      id: 0,
      firstName: this.formRegister.value.firstName,
      lastName: this.formRegister.value.lastName,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password,
      isValid: 0
    };

    this._auth.registerUser(userEntry).subscribe({
      next: (res) => {
        console.log(res);
        if(res.data) {
          this._auth.eventSession.emit(true);
          this.router.navigate(['/']);
          this.showSnackBar("Usuario registrado correctamente.", "OK");
        }
      },
      error: (e) => console.log(e)
    })
  }

  showSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

}
