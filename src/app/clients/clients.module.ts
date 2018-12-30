import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListingComponent } from './component/client-listing/client-listing.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientService } from './services/client.service';
import { DialogFormComponent } from './component/dailog/dialog.component';

@NgModule({
  declarations: [
    ClientListingComponent,
    DialogFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    ClientListingComponent
  ],
  providers: [ClientService],
  entryComponents: [DialogFormComponent]
})
export class ClientsModule { }
