import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListingComponent } from './component/invoice-listing/invoice-listing.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceService } from './services/invoice.service';
import { InvoiceFormComponent } from './component/invoice-form/invoice-form.component';
import { InvoiceListingAlternateComponent } from './component/invoice-listing/invoice-listing.component-alternate';
import { EditInvoiceResolverService } from './services/edit-invoice-resolver.service';
import { InvoiceViewComponent } from './component/invoice-view/invoice-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    InvoiceListingComponent,
    InvoiceFormComponent,
    InvoiceListingAlternateComponent,
    InvoiceViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    // HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    InvoiceListingComponent,
    InvoiceFormComponent
  ],
  providers: [
    InvoiceService,
    EditInvoiceResolverService
  ]
})
export class InvoicesModule { }
