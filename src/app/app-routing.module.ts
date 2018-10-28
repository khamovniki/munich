import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewPostComponent} from './new-post/new-post.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthGuard} from './guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'new-post',
    component: NewPostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
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
