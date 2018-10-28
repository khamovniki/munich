import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

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

  constructor(private http: HttpClient, private authService: AuthService) {
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
      },
      () => {
        console.log('Error');
      }
    );
  }
}
