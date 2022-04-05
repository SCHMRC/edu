import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import  { environment } from 'src/environments/environment'
import * as ROUTE from 'src/assets/label/path_route'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = environment.apiURI



  constructor(private http: HttpClient) { }



  login(): Observable<any>{
    return this.http.get<any>(`${this.api}${ROUTE.PATH_ROUTE.AUTORIZATION_PATH}`)
  }

  signin(user): Observable<any>{
    console.log(`${this.api}${ROUTE.PATH_ROUTE.SIGNIN_PATH}`)
    return this.http.post<any>(`${this.api}${ROUTE.PATH_ROUTE.SIGNIN_PATH}`,user)
  }

}
