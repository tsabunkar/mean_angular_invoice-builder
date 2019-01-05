import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainContentComponent } from './component/main-content/main-content.component';
import { DashboardComponent } from './dashboard.component';
import { InvoiceListingComponent } from '../invoices/component/invoice-listing/invoice-listing.component';
import { ClientListingComponent } from '../clients/component/client-listing/client-listing.component';
import { InvoiceFormComponent } from '../invoices/component/invoice-form/invoice-form.component';
import { AuthGuard } from '../core/services/auth.guard';
import { EditInvoiceResolverService } from '../invoices/services/edit-invoice-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard], // !Gaurding below routes
    children: [
      { path: '', component: MainContentComponent },
      { path: 'invoices', component: InvoiceListingComponent },
      { path: 'invoices/new', component: InvoiceFormComponent },
      {
        path: 'invoices/:id', component: InvoiceFormComponent,
        // ?Concept of RESOLVERS
        resolve: { resolverPreFetchingInvoice: EditInvoiceResolverService } // !Fetching data before rotuing to 'invoices/:id'
      },
      { path: 'clients', component: ClientListingComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
