import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  // { path: '', component: AuthComponent, outlet: 'auth' /* , canActivate: [AuthGuard] */},
  { path: '', component: AppComponent , canActivate: [AuthGuard],
    children: [
      {
        path: '', canActivateChild: [AuthGuard],
        children: []
      }
    ]
  },
  { path: 'auth', component: AuthComponent },
  { path: 'rg', component: AuthComponent, data: {type: 'reg'} },
  { path: 'fpwd', component: AuthComponent, data: {type: 'fpwd'} },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
