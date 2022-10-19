import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // { path: '', component: AuthComponent, outlet: 'auth' /* , canActivate: [AuthGuard] */},
  { path: '', component: HomeComponent , canActivate: [AuthGuard],
    children: [
      {
        path: '', canActivateChild: [AuthGuard],
        children: []
      }
    ]
  },
  { path: 'auth', component: AuthComponent }, //use login
  { path: 'auth/logout', component: AuthComponent,  data: {type: 'logout'}},
  { path: 'reg', component: AuthComponent, data: {type: 'reg'} },
  { path: 'reg/echeck', component: AuthComponent, data: {type: 'echeck'} },
  { path: 'reg/verify', component: AuthComponent, data: {type: 'verify'} },
  { path: 'fpwd', component: AuthComponent, data: {type: 'fpwd'} },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
