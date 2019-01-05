import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtService } from 'src/app/auth/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toogleSideNav = new EventEmitter<void>();
  constructor(private _jwtService: JwtService,
    private _router: Router
  ) { }

  ngOnInit() {
  }


  toogleMySideNavbar() {
    this.toogleSideNav.emit();
  }
  logout() {
    this._jwtService.destoryToken();
    this._router.navigate(['/login']);
  }


}
