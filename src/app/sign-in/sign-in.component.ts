import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

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
  signIn() {
    console.log(this.signInForm.value);
  }
}
