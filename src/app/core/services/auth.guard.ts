import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { JwtService } from 'src/app/auth/services/jwt.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
// export class AuthGuard implements CanActivate {

  constructor(private _jwtService: JwtService,
    private _router: Router,
    private _authService: AuthService
  ) { }



  // !protect parent routes
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const vendorToken = route.queryParamMap.get('authtoken'); // !get vendor token from query paramter

    // !if user is logged in then
    if (this._jwtService.getToken()) {
      // return true;
      return of(true);


    } else if (vendorToken) { // !Signied with google,twitter,etc...

      return this._authService.validateVendorTokenIsValidJWTToken(vendorToken)
        .pipe(
          tap(data => {
            console.log('tap data', data);
          }),

          map(authenticated => {
            if (authenticated) {// !authenticated user by 3rd party vendor
              this._jwtService.setToken(vendorToken); // !setting vendorToken in local storage
              this._router.navigate(['/dashboard', 'invoices']);
              return true;

            }
            return false;
          }),
          catchError(err => {
            this._router.navigate(['/login']);
            return of(false);
          })

        );


    } else { // ! notllogged in user the, ask them to login first by navigating to login page
      this._router.navigate(['/login']);
      // return false;
      return of(false);

    }

  }


    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
      : Observable<boolean> {// !protect all child routes of the parent route
      return this.canActivate(route, state);
    }


}
