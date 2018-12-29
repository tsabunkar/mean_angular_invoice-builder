import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice';
import { UpdateInvoice } from '../../models/update-invoice';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  invoiceFormGroup: FormGroup;
  private updatedInvoiceOnEdit: {};

  constructor(private _formBuilder: FormBuilder,
    private _invoiceService: InvoiceService,
    private snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
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

      this._invoiceService.getInvoiceById(id)
        .subscribe(invoice => {
          this.updatedInvoiceOnEdit = invoice;
          this.invoiceFormGroup.patchValue(invoice);
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


}
