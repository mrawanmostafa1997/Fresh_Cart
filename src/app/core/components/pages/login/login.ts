import { Component } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { Auth } from '../../../services/auth/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  isLoading: boolean = false;
  errMsg!: string;
  formLogin: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  constructor(private _Auth: Auth, private _Router: Router) {}
  loginForm() {
    if (this.formLogin.valid) {
      this.isLoading = true;
      this._Auth.login(this.formLogin.value).subscribe({
        next: (resp) => {
          this.isLoading = false;
          localStorage.setItem('userToken', resp.token);
          this._Auth.decoderToken();

          this._Router.navigate(['home']);
        },
        error: (err) => {
          this.errMsg = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
