import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtService } from './services/jwt.service';
import { RouterModule } from '@angular/router';
import { ErrorInterceptorService } from '../core/services/error-interceptor.service';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    // HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthService,
    JwtService,
    // !using error interceptor only in Authmodule
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ]
})
export class AuthModule { }
