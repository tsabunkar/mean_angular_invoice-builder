import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  register(payload: User): Observable<{ message: string, data: string }> {
    return this._http
      .post<{ message: string, data: string }>(`${environment.api_url}/user/signup`, payload);
  }

  login(payload: User): Observable<HttpResponse<Response>> {
    return this._http
      .post<Response>(`${environment.api_url}/user/signin`, payload, { observe: 'response' });
  }


  googleAuth(): Observable<Response> {
    return this._http.get<Response>(`${environment.api_url}/auth/google`);
  }




  validateVendorTokenIsValidJWTToken(authToken): Observable<boolean> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `bearer ${authToken}`
      })
    };
    return this._http.get<boolean>(`${environment.api_url}/auth/authenticate`, httpOptions);
  }

}
