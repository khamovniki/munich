import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.template.html',
  styleUrls: ['sign-up.style.css']
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) {}
  signUp() {
    const {username, password, confirmPassword} = this.signUpForm.value;
    if (password === confirmPassword) {
      console.log(username, password);
      this.http.post('api/signUp', {
        username,
        password
      }).subscribe(
        () => {
          this.openSnackBar('Sign up is successful', { duration: 3000 });
          this.router.navigate(['sign-in']);
        },
        () => {
          this.openSnackBar('Sign up is failed', { duration: 3000 });
        }
      );
    } else {
      console.log('Password incorrect');
    }
  }
  private openSnackBar(message: string, configForSnack: MatSnackBarConfig) {
    this.snackBar.open(message, null, configForSnack);
  }
}
