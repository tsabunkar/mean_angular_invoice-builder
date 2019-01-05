import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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

}
