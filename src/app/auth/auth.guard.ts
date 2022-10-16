import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { HttpService } from '../common/http.service';
import { User, TKN } from './user';


export const AUTH_EP = environment.apiEndpoint+'/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  authService: HttpService<User>;

  constructor(protected ngZone: NgZone, http: HttpClient, private router: Router) {
    this.authService = new HttpService(http, AUTH_EP);
  }

  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('canActivate');

      if(this.isLoggedOn()){
        return true;
      }
      this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url }});
      return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('canActivateChild');
      return true;
  }

  canLoad(route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('canLoad');
      return true;
  }

  isLoggedOn(): boolean{
    const tkn = localStorage.getItem(TKN);
    console.log('isLoggedOn', tkn == undefined);
    return tkn == undefined;
  }
}
