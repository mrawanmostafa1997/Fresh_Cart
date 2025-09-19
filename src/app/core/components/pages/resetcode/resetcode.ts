import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Auth } from '../../../services/auth/auth';

@Component({
  selector: 'app-resetcode',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './resetcode.html',
  styleUrl: './resetcode.scss',
})
export class Resetcode {
  isLoading: boolean = false;
  constructor(private _AuthService: Auth) {}
  ResetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]{4,}$/),
    ]),
  });
  submitResetCode() {
    if (this.ResetCodeForm.valid) {
      this.isLoading = true;
      this._AuthService.verifyResetCode(this.ResetCodeForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
