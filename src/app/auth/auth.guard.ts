import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { HttpService } from '../common/http.service';
import { User, TKN } from './user';


const AUTH_EP = environment.apiEndpoint+'/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  authService: HttpService<User>;

  constructor(protected ngZone: NgZone, http: HttpClient, private router: Router) {
    this.authService = new HttpService(http, AUTH_EP);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.isLoggedOn()){
        return true;
      }
      this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url }});
      return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  isLoggedOn(): boolean{
     const tkn = localStorage.getItem(TKN);
     return tkn? tkn.length > 0: false;
  }

  login(email:string, password:string ) {
    return this.authService.create({email, password}, '/ses')
      .pipe(
        tap((tkn: any) => {
          // console.log(tkn);
          localStorage.setItem(TKN, tkn.token);
        })
      );
          
  }

  logout(email:string, password:string ) {
    return this.authService.delete('/ses')
      .pipe(
        tap((tkn: any) => {
          // console.log(tkn);
          localStorage.removeItem(TKN);
        })
      );
  }
  register(email:string, password:string): Observable<any> {
    return this.authService.create({email, password}, 'reg');
  }

  fpwd(pwd: any): Observable<any> {
    return this.authService.update(pwd, 'fpwd');
  }
}
