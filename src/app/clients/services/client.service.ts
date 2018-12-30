import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _http: HttpClient) { }

  getClients(): Observable<HttpResponse<Response>> {
    return this._http.get<Response>(`${BASE_URL}/client`, { observe: 'response' });
  }

  createClient(payload: Client): Observable<Client> {
    return this._http.post<Client>(`${BASE_URL}/client`, payload);
  }

}
