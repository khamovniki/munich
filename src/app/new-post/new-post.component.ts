import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-new-post',
  templateUrl: 'new-post.template.html',
  styleUrls: ['new-post.style.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class NewPostComponent {
  postForm = new FormGroup({
    text: new FormControl(''),
    tags: new FormControl(''),
    schedule: new FormControl(false),
    date: new FormControl(''),
    time: new FormControl('')
  });
  tagList: string[] = ['Lol', 'Kek'];
  modules = {};
  constructor(private http: HttpClient) {
    this.modules = {
      toolbar: [['bold'], ['italic'], ['link']]
    };
    this.http.get('api/tags/list').subscribe((tags: [string]) => this.tagList = tags);
  }
  sendPost() {
    // this.postForm.value.date.setTime(this.postForm.value.time);
    console.log(this.postForm.value);
  }
  setFocus($event) {
    $event.focus();
  }
}
