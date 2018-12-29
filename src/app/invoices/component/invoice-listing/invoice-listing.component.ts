import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Observable } from 'rxjs';
import { Invoice } from '../../models/invoice';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {

  invoices$: Observable<Invoice[]>;
  dataSource: Invoice[] = [];
  displayedColumns: string[] = ['item', 'quantity', 'date', 'dueDate', 'rate', 'tax', 'action'];

  constructor(
    private _invoiceService: InvoiceService,
    private _router: Router,
    private _route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.invoices$ = this._invoiceService.getInvoices();
  }

  onClickOfAddNew() {
    this._router.navigate(['new'], { relativeTo: this._route }); // relative approach
    // !(or)
    // this._router.navigate(['dashboard', 'invoices', 'new']);
  }

  deleteClickHandler(id) {
    console.log(id);
    this._invoiceService.deleteInvoice(id)
      .subscribe(
        data => {

          // !update the table
          this.reInitializeTableData(); // will make a bakend call (GETALL)

          // !show snackbar
          this.openSnackBar(`Deleted ${data['data']['item']} successfully`, 'Success');
        },
        err => {
          this.errorHandler(err, 'Falied to delete invoice');
        }
      );
  }

  reInitializeTableData() {
    this.invoices$ = this._invoiceService.getInvoices();
  }

  editClickHandler(id: string) {
    this._router.navigate([id], { relativeTo: this._route });
  }


  private errorHandler(error, message) {
    console.error(error);
    this.openSnackBar(message, 'Error');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }



}
