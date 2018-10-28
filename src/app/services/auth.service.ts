import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LOCAL_STORAGE_NAME} from '../app.consts';

@Injectable()
export class AuthService {
  private _token: string;
  get token() {
    return this._token;
  }
  set token(newValue) {
    localStorage.setItem(LOCAL_STORAGE_NAME, newValue);
    this._token = newValue;
  }
  constructor() {
    this._token = localStorage.getItem(LOCAL_STORAGE_NAME);
  }
  isLogin(): boolean {
    return this.token !== null;
  }
  logout() {
    this.token = null;
  }
  authorize(token: string) {
    this.token = token;
  }
}
