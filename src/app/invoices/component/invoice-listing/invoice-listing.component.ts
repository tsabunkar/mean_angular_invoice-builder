import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Observable, merge, observable, empty, of, BehaviorSubject } from 'rxjs';
import { Invoice } from '../../models/invoice';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, PageEvent, MatSort, MatPaginator } from '@angular/material';
import { map, tap, startWith, switchMap, catchError } from 'rxjs/operators';


// ![UseCase]- Using RxJs operators when pagination or sorting event occurs. And not reinitalizing the table data source for every
// !small event like- on change of page, on sort of column, on delete of row as did in InvoiceListingAlternateComponent Apporach
@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit, AfterViewInit {

  invoices$: Observable<Invoice[]>;
  invoices: Invoice[];

  dataSource: Invoice[] = [];
  displayedColumns: string[] = ['item', 'quantity', 'date', 'dueDate', 'rate', 'tax', 'action'];

  totalNumberOfRecords = 0;
  itemsPerPage = 10;
  currentPageIn = 1;
  isSpinnerLoading = false;

  @ViewChild(MatSort) materialSort: MatSort;
  @ViewChild(MatPaginator) materialPaginator: MatPaginator;

  constructor(
    private _invoiceService: InvoiceService,
    private _router: Router,
    private _route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

  }

  /*
  ngAfterViewInit(): void {
    // !Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // !after view/Template is initialized then perform below logic

    this.reInitializeTableData(); // initializing the data-table with default values for pagination

    // !Sorting
    // this.materialSort.sortChange.subscribe((sortData) => {
    //   console.log(sortData);
    //   this.reInitializeTableData();
    // });

    // !Alternatively of above sorting code
    this.materialSort.sortChange
      .pipe(
        tap((sortData) => {
          console.log(sortData);
          this.reInitializeTableData();
        })
      ).subscribe();
  }
 */

  // !ALternate way of doing above code
  ngAfterViewInit(): void {

    console.log(this.materialSort);
    console.log(this.materialPaginator);
    // if any of the event happens (i.e-paignation event or sorting event), then this merge operator logic will be applied

    // this.invoices$ = merge(this.materialPaginator.page, this.materialSort.sortChange)
    merge(this.materialPaginator.page, this.materialSort.sortChange)
      .pipe(

        tap(() => {
          this.isSpinnerLoading = true;
        }),

        startWith({}), // empty observable

        switchMap(() => {

          return this._invoiceService.getInvoices({
            itemsPerPage: this.materialPaginator.pageSize, // pageSize -> will give limit/items per page to be displayed
            currentPage: this.materialPaginator.pageIndex + 1, // pageIndex-> will give the currentPage/page-number (but starts from 0)
            sortFiled: this.materialSort.active, // active -> Will give the filed name/column name on which user clicked for sort
            sortDirection: this.materialSort.direction, // dirction -> will give -weather user wants ascending/decending order of sort
            filter: ''
          });
        }),

        map(resp => {// fetching invoices from response body
          // this.isSpinnerLoading = false;
          this.totalNumberOfRecords = +resp.headers.get('record-count');
          return resp.body['data'];
        }),

        catchError(() => {
          // this.isSpinnerLoading = false;
          this.errorHandler('Failed to fetch Invoices', 'Error');
          return empty(); // returns empty observable
        }),

        tap(() => {
          this.isSpinnerLoading = false;
        })

      ).subscribe(data => {
        this.invoices = data;
      }); // !directly rendering the template by using async pipe is not working,
    // !as ngAfterviewInit() func will not detect Observable, rather it will detect subscribe() function

  }



  onClickOfAddNew() {
    this._router.navigate(['new'], { relativeTo: this._route }); // relative approach
    // !(or)
    // this._router.navigate(['dashboard', 'invoices', 'new']);
  }


  /*
    reInitializeTableData() {

      this.invoices$ = this._invoiceService
        .getInvoices({
          itemsPerPage: this.itemsPerPage,
          currentPage: this.currentPageIn,
          sortFiled: this.materialSort.active, // active -> Will give the filed name/column name on which user clicked for sort
          sortDirection: this.materialSort.direction, // dirction -> will give -weather user wants ascending/decending order of sort
          filter: ''
        }) // passing argum as object (destructring concept)
        .pipe(
          tap(
            resp => { // fetching total number of records from response header
              this.isSpinnerLoading = true;
              this.totalNumberOfRecords = +resp.headers.get('record-count');
              // return resp;
            }
          ),
          map(resp => {// fetching invoices from response body
            this.isSpinnerLoading = false;
            return resp.body['data'];
          }),
          catchError(() => {
          this.isSpinnerLoading = false;
          this.errorHandler('Failed to fetch Invoices', 'Error');
          return empty(); // returns empty observable
        })
        );

    }
   */

  /*
  onChangedPage(pageData: PageEvent) { // PageEvent -> Object holding-data about the current page
    this.currentPageIn = pageData.pageIndex + 1; // pageIndex -> start with 0, so +1
    this.itemsPerPage = pageData.pageSize;
    this.reInitializeTableData();
  }
 */

  deleteClickHandler(id) {
    this._invoiceService.deleteInvoice(id)
      .subscribe(
        invoiceDeleted => {

          // !update the table
          // this.reInitializeTableData(); // will make a bakend call (GETALL)

          // !above code will not work, so to getupdated result-
          this.invoices$.subscribe(updatedInvoices => {
            this.invoices$ = of(updatedInvoices); // !of() -> operator is used to convert  <data-type> to Observable<data-type>
          });


          // !show snackbar
          this.openSnackBar(`Deleted ${invoiceDeleted['data']['item']} successfully`, 'Success');
        },
        err => {
          this.errorHandler(err, 'Falied to delete invoice');
        }
      );
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
      duration: 3000,
    });
  }

  filterInvoicesOnKeyUp(event: Event) {
    this.isSpinnerLoading = true;
    let filteredValue = event.target['value'];
    filteredValue = filteredValue.trim(); // triming extra spaces

    this.materialPaginator.pageIndex = 0; // firstpage

    // this.invoices$ = this._invoiceService.getInvoices({
    this._invoiceService.getInvoices({
      itemsPerPage: this.materialPaginator.pageSize, // pageSize -> will give limit/items per page to be displayed
      currentPage: this.materialPaginator.pageIndex + 1, // pageIndex-> will give the currentPage/page-number (but starts from 0)
      sortFiled: this.materialSort.active, // active -> Will give the filed name/column name on which user clicked for sort
      sortDirection: this.materialSort.direction, // dirction -> will give -weather user wants ascending/decending order of sort
      filter: filteredValue
    })
      .pipe(
        tap(
          resp => { // fetching total number of records from response header
            this.totalNumberOfRecords = +resp.headers.get('record-count');
          }
        ),
        map(resp => {// fetching invoices from response body
          return resp.body['data'];
        }),
        catchError(() => {
          this.errorHandler('Failed to Filter Invoices', 'Error');
          return empty(); // returns empty observable
        }),
        tap(() => {
          this.isSpinnerLoading = false;
        }
        )
      ).subscribe(data => { this.invoices = data; }); // !directly rendering the template by using async pipe is not working,
    // !as ngAfterviewInit() func will not detect Observable, rather it will detect subscribe() function
  }


}
