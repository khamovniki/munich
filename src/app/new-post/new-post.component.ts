import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialog} from '@angular/material';
import {NewTagComponent} from './new-tag/new-tag.component';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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

  constructor(private http: HttpClient, public dialog: MatDialog) {
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

    return this.tagList.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
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
    if (event.option.viewValue !== `Add tag "${this.postForm.controls.tags.value}"`) {
      this.tags.push(event.option.viewValue);
      this.tagInput.nativeElement.value = '';
      this.postForm.controls.tags.setValue(null);
    }
  }
  sendPost() {
    const {text} = this.postForm.value;
    if (this.postForm.controls.schedule.value) {
      const {date, time} = this.postForm.value;
      const timestamp = moment(`${date.format('MM/DD/YYYY')} ${time}`);
      const body = {
        text,
        tags: this.tags,
        timestamp
      };
      console.log(JSON.stringify(body));
      this.http.post('/api/post', body).subscribe(
        () => {
          console.log('Send');
        },
        () => {
          console.log('Not send');
        }
      );
    } else {
      const body = {
        text,
        tags: this.tags
      };
      console.log(JSON.stringify(body));
      this.http.post('/api/post', body).subscribe(
        () => {
          console.log('Send');
        },
        () => {
          console.log('Not send');
        }
      );
    }
  }

  addNewTag() {
    const tags = this.postForm.controls.tags.value;
    if ((tags || '').trim()) {
      this.tags.push(tags.trim());
    }
    this.http.post(`api/tags/create/${tags}`, {});
    this.tagInput.nativeElement.value = '';
    this.postForm.controls.tags.setValue(null);
  }

  openNewTagDialog() {
    console.log('New tag');
    const dialogRef = this.dialog.open(NewTagComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(
      result => {
        console.log('Dialog is closed');
      }
    );
  }
}
