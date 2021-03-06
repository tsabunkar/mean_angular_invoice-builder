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

  logoutUser(): Observable<{ message: string }> {
    return this._http.get<{ message: string }>(`${environment.api_url}/auth/logout`);
  }

  forgotPassword(data: { email: string }): Observable<{ message: string }> {
    return this._http.post<{ message: string }>(`${environment.api_url}/user/forgotpassword`, data);
  }

  resetPassword(body): Observable<{ message: string }> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${body.token}`
      })
    };

    return this._http.put<{ message: string }>(
      `${environment.api_url}/user/resetpassword`,
      { password: body.password },
      httpOptions
    );
  }

}
