import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from 'src/app/auth/services/jwt.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _jwtService: JwtService) { }

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

    return next.handle(clonedRequest);
  }

}
