import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtService } from 'src/app/auth/services/jwt.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toogleSideNav = new EventEmitter<void>();
  constructor(private _jwtService: JwtService,
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }


  toogleMySideNavbar() {
    this.toogleSideNav.emit();
  }
  logout() {
    this._authService.logoutUser()
      .subscribe(data => {
        console.log(data.message);
      },
        err => {
          console.log(err);
        },
        () => {
          this._jwtService.destoryToken();
          this._router.navigate(['/login']);
        });


  }


}
