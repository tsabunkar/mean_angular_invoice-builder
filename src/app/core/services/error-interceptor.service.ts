import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ErrorComponent } from 'src/app/shared/error/error.component';
import { catchError } from 'rxjs/operators';

// !Intercepting Response from recieved from Server to Client
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(public dialog: MatDialog) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(

      catchError((error: HttpErrorResponse) => {
        console.log('Im from error -httpinterceptor', error);
        // !Error handling logic here

        let errorMessage = 'An Unkown Error Occured!';
        if (error.error.message.message) {
          errorMessage = error.error.message.message;
        }
        this.dialog.open(ErrorComponent, { data: { message: errorMessage } });

        return throwError(error); // this will generate a new Observable, in which we can pass the error
      })

    );
  }
}
