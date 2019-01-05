import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Invoice } from '../models/invoice';
import { Observable } from 'rxjs';
import { InvoiceService } from './invoice.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditInvoiceResolverService implements Resolve<Invoice> {

  constructor(private _invoiceService: InvoiceService,
    private _router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<any> {

    const id = route.paramMap.get('id');
    console.log('From Resolver', id);

    return this._invoiceService.getInvoiceById(id)
      .pipe(
        take(1), // take 1

        map(invoice => {

          if (invoice) {
            return invoice;
          } else {
            this._router.navigate(['/dashboard', 'invoices']);
            return null;
          }

        })
      );


  }
}
