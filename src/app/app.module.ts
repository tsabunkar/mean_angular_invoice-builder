import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { MaterialModule } from './shared/material.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ErrorComponent } from './shared/error/error.component';
import { ErrorInterceptorService } from './core/services/error-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    CoreModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ErrorComponent
  ]
})
export class AppModule { }
