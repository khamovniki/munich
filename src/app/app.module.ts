import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NewPostComponent} from './new-post/new-post.component';
import {AppRoutingModule} from './app-routing.module';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatChipsModule,
  MatDatepickerModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {HttpClientModule} from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import {NewTagComponent} from './new-post/new-tag/new-tag.component';

@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    NewTagComponent
  ],
  entryComponents: [
    NewTagComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule.forRoot(),
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatChipsModule,
    MatAutocompleteModule,
    QuillModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
