import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../../../services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetnewpassword',
  imports: [FormsModule, ReactiveFormsModule],

  templateUrl: './resetnewpassword.html',
  styleUrl: './resetnewpassword.scss',
})
export class Resetnewpassword {
  constructor(private _auth: Auth, private _Router: Router) {}
  isLoading: boolean = false;
  errMsg: string = '';
  resetNewPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9]{8,}$/),
    ]),
  });
  submitNewPassword() {
    if (this.resetNewPasswordForm.valid) {
      this.isLoading = true;
      this._auth.resetNewPassword(this.resetNewPasswordForm.value).subscribe({
        next: (resp) => {
          localStorage.setItem('userToken', resp.token);
          this._auth.decoderToken();

          this._Router.navigate(['home']);
          this.isLoading = false;
        },
        error: (err) => {
          this.errMsg = err.error.Message;
          this.isLoading = true;
        },
        complete: () => {
          this.isLoading = true;
        },
      });
    }
  }
}
