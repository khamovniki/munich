import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewPostComponent} from './new-post/new-post.component';

const appRoutes: Routes = [
  {
    path: 'new-post',
    component: NewPostComponent
  },
  {
    path: '',
    redirectTo: 'new-post',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
