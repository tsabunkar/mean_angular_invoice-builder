import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatIconModule,
  MatSidenavModule, MatToolbarModule, MatListModule,
  MatCardModule, MatTableModule, MatMenuModule,
  MatTooltipModule, MatFormFieldModule, MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule
} from '@angular/material';

const exportedMaterialModule = [
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatMenuModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [],
  /* imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
  ], */
  exports: [
    ...exportedMaterialModule // use spread operator
  ]
})
export class MaterialModule { }
