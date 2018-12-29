import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Observable } from 'rxjs';
import { Invoice } from '../../models/invoice';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, PageEvent } from '@angular/material';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {

  invoices$: Observable<Invoice[]>;
  dataSource: Invoice[] = [];
  displayedColumns: string[] = ['item', 'quantity', 'date', 'dueDate', 'rate', 'tax', 'action'];

  totalNumberOfRecords = 0;
  itemsPerPage = 10;
  currentPageIn = 1;
  isSpinnerLoading = false;

  constructor(
    private _invoiceService: InvoiceService,
    private _router: Router,
    private _route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.reInitializeTableData(); // initializing the data-table with default values for pagination
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
    this.isSpinnerLoading = true;

    this.invoices$ = this._invoiceService
      .getInvoices({ itemsPerPage: this.itemsPerPage, currentPage: this.currentPageIn }) // passing argum as object (destructring concept)
      .pipe(
        tap(
          resp => { // fetching total number of records from response header
            this.totalNumberOfRecords = +resp.headers.get('record-count');
            return resp;
          }
        ),
        map(resp => {// fetching invoices from response body
          this.isSpinnerLoading = false;
          return resp.body['data'];
        })
      );

  }

  onChangedPage(pageData: PageEvent) { // PageEvent -> Object holding-data about the current page

    this.currentPageIn = pageData.pageIndex + 1; // pageIndex -> start with 0, so +1
    this.itemsPerPage = pageData.pageSize;
    this.reInitializeTableData();
  }



  editClickHandler(id: string) {
    this._router.navigate([id], { relativeTo: this._route });
  }


  private errorHandler(error, message) {
    this.isSpinnerLoading = false;
    console.error(error);
    this.openSnackBar(message, 'Error');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }



}
