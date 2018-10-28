import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

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
  signUp() {
    const {username, password, confirmPassword} = this.signUpForm.value;
    if (password === confirmPassword) {
      console.log(username, password);
    } else {
      console.log('Password incorrect');
    }
  }
}
