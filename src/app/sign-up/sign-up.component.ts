import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

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
  constructor(private http: HttpClient, private router: Router) {}
  signUp() {
    const {username, password, confirmPassword} = this.signUpForm.value;
    if (password === confirmPassword) {
      console.log(username, password);
      this.http.post('api/signUp', {
        username,
        password
      }).subscribe(
        () => {
          console.log('Cool');
          this.router.navigate(['sign-in']);
        },
        () => {
          console.log('Bad');
        }
      );
    } else {
      console.log('Password incorrect');
    }
  }
}
