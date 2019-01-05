import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from 'src/app/auth/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
// export class AuthGuard implements CanActivate, CanActivateChild {
export class AuthGuard implements CanActivate {

  constructor(private _jwtService: JwtService,
    private _router: Router
  ) { }

  // !protect parent routes
  canActivate(): boolean {
    // !if user is logged in then
    if (this._jwtService.getToken()) {
      return true;
    } else { // ! notllogged in user the, ask them to login first by navigating to login page
      this._router.navigate(['/login']);
      return false;
    }
  }


/*   canActivateChild(): boolean {// !protect all child routes of the parent route
    return this.canActivate();
  } */


}
