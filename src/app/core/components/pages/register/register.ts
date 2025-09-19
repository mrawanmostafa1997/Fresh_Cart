import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Auth } from '../../../services/auth/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  errorMessage!: string;
  isLoading: boolean = false;
  constructor(private _Auth: Auth, private _Router: Router) {}
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Z][a-z0-9]{7,}$'),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^(01[0125][0-9]{8})$'),
      ]),
    },
    this.passwordMatchValidator
  );

  submitRegisterForm() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._Auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          localStorage.setItem('userToken', res.token);
          this._Auth.decoderToken();

          this._Router.navigate(['home']);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
  passwordMatchValidator(x: AbstractControl) {
    if (x.get('password')?.value === x.get('rePassword')?.value) {
      return null;
    } else {
      x.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }
}
