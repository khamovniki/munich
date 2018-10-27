import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-new-tag',
  templateUrl: 'new-tag.template.html',
  styleUrls: ['new-tag.style.css']
})
export class NewTagComponent {
  tagForm = new FormGroup({
    name: new FormControl('')
  });
  constructor(
    public dialogRef: MatDialogRef<NewTagComponent>
  ) {}
  addTag() {
    console.log(this.tagForm.value.name);
    this.dialogRef.close();
  }
}
