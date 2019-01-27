import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice';
import { UpdateInvoice } from '../../models/update-invoice';
import { ClientService } from 'src/app/clients/services/client.service';
import { Client } from 'src/app/clients/models/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  formTitle = 'Create Invoice';
  invoiceFormGroup: FormGroup;
  private updatedInvoiceOnEdit: {};
  clients$: Observable<Client[]>;

  constructor(private _formBuilder: FormBuilder,
    private _invoiceService: InvoiceService,
    private snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    private _clientService: ClientService
  ) { }

  ngOnInit() {
    this.setClientsList();
    this.createForm();
    this.updateInvoiceFormOnEdit();
  }

  createForm() {
    this.invoiceFormGroup = this._formBuilder.group({
      itemControl: ['', Validators.required],
      quantityControl: ['', Validators.required],
      dateControl: ['', Validators.required],
      duedateControl: ['', Validators.required],
      rateControl: '',
      taxControl: '',
      clientControl: ['', Validators.required]
    });
  }

  onFormSubmit() {

    if (this.updatedInvoiceOnEdit) { // updatedInvoiceOnEdit object exist, then edit mode

      this._invoiceService
        .updateInvoice(this.updatedInvoiceOnEdit['data']['_id'], this.invoiceFormGroup.value)
        .subscribe(
          data => {
            this.openSnackBar(data['message'], 'Success');
            this.invoiceFormGroup.reset();
            this._router.navigate(['dashboard', 'invoices']);
          },
          err => {
            this.errorHandler(err, 'Falied to update invoice');
          });

    } else {

      this._invoiceService.createInvoice(this.invoiceFormGroup.value).subscribe(
        (data) => {
          this.openSnackBar(data['message'], 'Success');
          this.invoiceFormGroup.reset();
          this._router.navigate(['dashboard', 'invoices']);
        },
        err => {
          this.errorHandler(err, 'Falied to create invoice');
        }
      );
    }
  }

  updateInvoiceFormOnEdit() {
    this._route.params.subscribe(params => {
      const id = params['id'];
      console.log(params);

      if (!id) {
        return;
      }
      this.formTitle = 'Edit Invoice';

      /*      this._invoiceService.getInvoiceById(id)
             .subscribe(invoice => {
               this.updatedInvoiceOnEdit = invoice;
               this.invoiceFormGroup.patchValue(invoice);
             },
               err => {
                 console.log(err);
                 this.errorHandler(err, 'Falied to Get invoice');
               }
             ); */
      // ?Instead of fetch data from backend in edit mode, altrnate way is using RESOLVER Concept
      // ? which will prefetch the data before routing
      this._route.data
        .subscribe(data => {
          this.updatedInvoiceOnEdit = data.resolverPreFetchingInvoice;
          this.invoiceFormGroup.patchValue(data.resolverPreFetchingInvoice);



          this.invoiceFormGroup.patchValue({
            itemControl: this.updatedInvoiceOnEdit['itemControl'],
            quantityControl: this.updatedInvoiceOnEdit['quantityControl'],
            dateControl: this.updatedInvoiceOnEdit['dateControl'],
            duedateControl: this.updatedInvoiceOnEdit['duedateControl'],
            rateControl: this.updatedInvoiceOnEdit['rateControl'],
            taxControl: this.updatedInvoiceOnEdit['taxControl'],
            // clientControl: this.updatedInvoiceOnEdit['clientControl']['_id'],
          });
          // !if client property exist then only update the Clients drop-down in the template
          if (this.updatedInvoiceOnEdit['clientControl']) { // client exist then only patch the value
            this.invoiceFormGroup.patchValue({
              clientControl: this.updatedInvoiceOnEdit['clientControl']['_id']
            });
          }
        },
          err => {
            console.log(err);
            this.errorHandler(err, 'Falied to Get invoice');
          }
        );

    });

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

  private setClientsList(): Observable<Client[]> | void {
    this.clients$ = this._clientService.getClients()
      .pipe(
        map(respData => {
          return respData.body['data'];
        })
      );
  }


}
