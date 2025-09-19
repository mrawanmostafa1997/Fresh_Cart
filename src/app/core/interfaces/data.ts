export interface SignUpData extends SignInData {
  email: string;
  rePassword: string;
  phone: string;
}
export interface SignInData {
  email: string;
  password: string;
}
export interface ForgetPasswordData {
  email: string;
}
export interface ResetCodeData {
  resetCode: string;
}
export interface NewPasswordData extends ForgetPasswordData {
  newPassword: string;
}
