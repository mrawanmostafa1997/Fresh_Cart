import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ForgetPasswordData,
  NewPasswordData,
  ResetCodeData,
  SignInData,
  SignUpData,
} from '../../interfaces/data';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from '../../../enviroment/enviroment';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  userData: BehaviorSubject<null | JwtPayload> =
    new BehaviorSubject<null | JwtPayload>(null);
  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) id: object,
    private _Router: Router
  ) {
    if (isPlatformBrowser(id)) {
      if (localStorage.getItem('userToken') != null) {
        this.decoderToken();
      }
    }
  }

  register(data: SignUpData): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }
  login(data: SignInData): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }
  decoderToken() {
    const token = localStorage.getItem('userToken');
    const decodedToken = jwtDecode(token!);
    this.userData.next(decodedToken as JwtPayload);
    return decodedToken;
  }
  logout() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['login']);
  }
  forgetPassword(data: ForgetPasswordData): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }
  verifyResetCode(data: ResetCodeData): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }
  resetNewPassword(data: NewPasswordData): Observable<any> {
    return this._HttpClient.put(
      `${enviroment.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
}
