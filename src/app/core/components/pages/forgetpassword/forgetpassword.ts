import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../../../services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.html',
  styleUrl: './forgetpassword.scss',
})
export class Forgetpassword {
  isLoading: boolean = false;
  errorMsg: string = '';
  flagForgetPassword: boolean = true;
  flagResetCode: boolean = false;
  constructor(private _AuthService: Auth, private _router: Router) {}
  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  SubmitforgetPasswordForm() {
    if (this.forgetPasswordForm.valid) {
      this.isLoading = true;
      this._AuthService
        .forgetPassword(this.forgetPasswordForm.value)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this._router.navigate(['./resetcode']);
          },
          error: (error) => {
            this.errorMsg = error.error.message;
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  }
}
