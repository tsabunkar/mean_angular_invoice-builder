import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Observable, of, empty } from 'rxjs';
import { Client } from '../../models/client';
import { tap, map, filter, catchError } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogFormComponent } from '../dailog/dialog.component';
import { mergeMap, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {

  clients$: Observable<Client[]>;
  isSpinnerLoading = false;

  displayedColumns: string[] = ['firstNameCol', 'lastNameCol', 'genderCol', 'emailCol'];

  constructor(private _clientService: ClientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.clients$ = this._clientService.getClients()
      .pipe(
        tap(data => {
          console.log(data);
          console.log(data.body['data']);
        }),
        map(respData => {
          return respData.body['data'];
        })
      );
  }

  onClickOfAddNewClient(): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '400px',
      height: '350px',
      data: {} // send data to dailogComponent
    });

    /*
        dialogRef.afterClosed().subscribe(
          formData => {
            console.log(formData);
            this._clientService.createClient(formData)
              .subscribe(respData => {
                console.log(respData);
                this.openSnackBar(respData['message'], 'Success');
              },
                err => {
                  this.errorHandler(err, 'Falied to create invoice');
                });
          });
     */

    // *Above code has nested Subscription (Bad practice) so use flatMapoperator() ->

    dialogRef.afterClosed().pipe(

      tap(() => {
        this.isSpinnerLoading = true;
      }),

      // ! When Form is closed (irrespective of save or cancel) -> this afterClosed() observable is called, so only calling backend POST
      // ! when form is saved, not closed or cancelled so using filter() operator [Similar to filter() method of array]
      filter(formData => typeof (formData) === 'object'),

      flatMap( // flatMap() operator should be returned by observable type
        formData => {
          console.log(formData);
          return this._clientService.createClient(formData);
        }),


    )
      .subscribe(respData => {
        console.log(respData);

        // !update the current table-list without reloading the page
        this.clients$.subscribe(updatedClients => {
          this.clients$ = of(updatedClients); // !of() -> operator is used to convert  <data-type> to Observable<data-type>
        });
        this.isSpinnerLoading = false;
        this.openSnackBar(respData['message'], 'Success');
      },
        err => {
          this.errorHandler(err, 'Falied to create invoice');
        });

  } // end of onClickOfAddNewClient()


  private errorHandler(error, message) {
    alert(error);
    this.isSpinnerLoading = false;
    this.openSnackBar(message, 'Error');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }




}
