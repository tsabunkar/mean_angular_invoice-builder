import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JwtService } from 'src/app/auth/services/jwt.service';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { error } from 'util';

// !Intercepting Request send from CLient to Server
@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _jwtService: JwtService,
    private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfiguration = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    const jwtToken = this._jwtService.getToken();
    if (jwtToken) {
      headersConfiguration['Authorization'] = `bearer ${jwtToken}`;
    }
    const clonedRequest = req.clone({ setHeaders: headersConfiguration });

    // return next.handle(clonedRequest);
    // !Logic for - if token gets expired
    return next.handle(clonedRequest)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {

          },
          err => { // !2nd argument of tap operator
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this._jwtService.destoryToken();
                this._router.navigate(['/login']);
              }
            }
          }
        ),

      );
  }

}
