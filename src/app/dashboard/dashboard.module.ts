import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MainContentComponent } from './component/main-content/main-content.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { MaterialModule } from '../shared/material.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { ClientsModule } from '../clients/clients.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../core/services/auth-interceptor.service';

// !Dashboard Module is parent module for invoice module and client module
// !AppModule is parent module for Dashboard module
// !Intercepting only dashboard module (which will indeirectly intercpet both invoice and client modules)
@NgModule({
  declarations: [
    DashboardComponent,
    MainContentComponent,
    SideNavComponent,
    ToolbarComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    InvoicesModule, // ! importing Feature Module in dashboard Module itself, rather than AppModule
    ClientsModule // ! importing Feature Module in dashboard Module itself,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ]
})
export class DashboardModule { }
