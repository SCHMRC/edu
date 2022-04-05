import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as ROUTE from 'src/assets/label/path_route'
import { UtilityService } from 'src/service/utility.service';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  cloneRequest: HttpRequest<unknown>;

  constructor(private util : UtilityService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(sessionStorage.getItem('AuthToken')){
      let credential: string = sessionStorage.getItem('AuthToken')
      this.cloneRequest = request.clone({
        headers: request.headers.set('Authorization', credential ),
      })
    }else{
      this.cloneRequest = request;
    }
    return next.handle(this.cloneRequest);
  }
}
