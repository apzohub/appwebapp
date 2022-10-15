import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TKN } from './user';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const tkn = localStorage.getItem(TKN);

        if (tkn) {
            req = req.clone({
              setHeaders: {
                  Authorization: `Bearer ${tkn}`
              }
            });

            return next.handle(req);
        }
        else {
            return next.handle(req);
        }
  }
}
