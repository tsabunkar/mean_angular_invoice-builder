import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';
import { map } from 'rxjs/operators';


const BASE_URL = 'http://localhost:3000/api';

@Injectable()
export class InvoiceService {

  constructor(private _http: HttpClient) { }

  /*   getInvoices(): Observable<Invoice[]> {
      return this._http.get<Invoice[]>(`${BASE_URL}/invoice`);
    } */
  getInvoices({ itemsPerPage, currentPage }): Observable<HttpResponse<Response>> {
    const querParams = `?pageSize=${itemsPerPage}&currentPage=${currentPage}`;

    return this._http.get<Response>(`${BASE_URL}/invoice${querParams}`, { observe: 'response' });
  }

  createInvoice(invoice): Observable<Invoice> {

    const payload = {
      item: invoice.itemControl,
      quantity: invoice.quantityControl,
      date: invoice.dateControl,
      dueDate: invoice.duedateControl,
      rate: invoice.rateControl,
      tax: invoice.taxControl,
    };
    console.log('payload', payload);
    return this._http.post<Invoice>(`${BASE_URL}/invoice`, payload);

  }


  deleteInvoice(id: string): Observable<Invoice> {
    return this._http.delete<Invoice>(`${BASE_URL}/invoice/${id}`);
  }

  getInvoiceById(id: string): Observable<{}> {
    return this._http.get<Invoice>(`${BASE_URL}/invoice/${id}`)
      .pipe(
        map(responseData => {
          responseData['itemControl'] = responseData['data']['item'];
          responseData['quantityControl'] = responseData['data']['quantity'];
          responseData['dateControl'] = responseData['data']['date'];
          responseData['duedateControl'] = responseData['data']['dueDate'];
          responseData['rateControl'] = responseData['data']['rate'];
          responseData['taxControl'] = responseData['data']['tax'];
          console.log('responseData', responseData);
          return responseData;
        })
      );
  }

  updateInvoice(id: string, invoice): Observable<Invoice> {

    const payload = {
      item: invoice.itemControl,
      quantity: invoice.quantityControl,
      date: invoice.dateControl,
      dueDate: invoice.duedateControl,
      rate: invoice.rateControl,
      tax: invoice.taxControl,
    };

    return this._http.put<Invoice>(`${BASE_URL}/invoice/${id}`, payload);
  }
}

