import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatDialog,
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {config, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE} from 'ng-pick-datetime';
// import {OWL_MOMENT_DATE_TIME_FORMATS} from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-format.class';
// import {MomentDateTimeAdapter} from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-adapter.class';

@Component({
  selector: 'app-new-post',
  templateUrl: 'new-post.template.html',
  styleUrls: ['new-post.style.css']
})
export class NewPostComponent {
  postForm = new FormGroup({
    text: new FormControl(''),
    tags: new FormControl(''),
    schedule: new FormControl(false),
    timestamp: new FormControl(''),
  });
  tags: string[] = [];
  tagList: string[] = [];
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<string[]>;
  modules = {};
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
    this.modules = {
      toolbar: [['bold'], ['italic'], ['link']]
    };
    this.http.get('api/tags/list').subscribe((tags: [string]) => this.tagList = tags);
    this.filteredTags = this.postForm.controls.tags.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.tagList.slice())
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    const filterArray =  this.tagList.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
    return filterArray.filter(tag => {
      for (let i = 0; i < this.tags.length; i++) {
        if (tag.toLowerCase() === this.tags[i].toLowerCase()) {
          return false;
        }
      }
      return true;
    });
  }

  add(event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if (this.tagList.indexOf(value) !== -1) {
        if ((value || '').trim()) {
          this.tags.push(value.trim());
        }
        if (input) {
          input.value = '';
        }
        this.postForm.controls.tags.setValue(null);
      }
    }
  }

  remove(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent) {
    if (event.option.viewValue.slice(0, 7) !== 'Add tag' && this.tags.indexOf(event.option.viewValue) === -1) {
      this.tags.push(event.option.viewValue);
    }
    this.tagInput.nativeElement.value = '';
    this.postForm.controls.tags.setValue(null);
  }

  sendPost() {
    const {text: message, timestamp} = this.postForm.value;
    const body = {
      message,
      tags: this.tags,
      timestamp: moment(timestamp) || null
    };
    this.http.post('/api/post', body).subscribe(
        () => {
          console.log('Send');
          this.openSnackBar('Пост будет опубликован', { duration: 3000 });
        },
        () => {
          this.openSnackBar('Что то пошло не так', { duration: 3000 });
        }
      );
  }

  addNewTag() {
    const tags = this.postForm.controls.tags.value;
    if ((tags || '').trim()) {
      this.tags.push(tags.trim());
      this.tagList.push(tags.trim());
    }
    this.http.post(`api/tags/create/${tags}`, {}).subscribe(
      () => {
        this.openSnackBar('Добавлен новый тег', { duration: 3000 });
      },
      () => {
        this.openSnackBar('При добавлении тега произошла ошибка', { duration: 3000 });
      }
    );
  }
  private openSnackBar(message: string, config: MatSnackBarConfig) {
    this.snackBar.open(message, null, config);
  }
}
