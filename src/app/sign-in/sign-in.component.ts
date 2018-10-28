import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.template.html',
  styleUrls: ['sign-in.style.css']
})
export class SignInComponent {
  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, public snackBar: MatSnackBar) {
  }

  signIn() {
    console.log(this.signInForm.value);
    const {username, password} = this.signInForm.value;
    this.http.post('api/signIn', {
      username,
      password
    }).subscribe(
      (body: string) => {
        console.log(body);
        this.authService.authorize(body);
        this.openSnackBar('Sign in is successful', { duration: 3000 });
        this.router.navigate(['new-post']);
      },
      () => {
        this.openSnackBar('Sign in is failed', { duration: 3000 });
      }
    );
  }
  private openSnackBar(message: string, configForSnack: MatSnackBarConfig) {
    this.snackBar.open(message, null, configForSnack);
  }
}
