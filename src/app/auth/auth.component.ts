import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {


  authForm: FormGroup;
  formTitle = '';

  constructor(private _authService: AuthService,
    private _jwtService: JwtService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.initalizeForm();
    this.formTitle = this._router.url === '/login' ? 'Signin' : 'Signup';
  }

  private initalizeForm() {
    this.authForm = new FormGroup({
      'email': new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      'password': new FormControl(null, {
        validators: [Validators.required]
      }),
    });
  }


  onFormSubmit() {

    if (this.authForm.invalid) {
      return;
    }

    // !if formTitle is Signup then, need to send request for Register
    if (this.formTitle === 'Signup') {
      this._authService.register(this.authForm.value)
        .subscribe(data => {
          console.log(data);
          // !setting jwtotken, now navigate to invoice tab
          this._router.navigate(['login']);


        },
          err => { console.log(err); }
        );

    } else {
      this._authService.login(this.authForm.value)
        .subscribe(data => {

          // !setting jwttoken in local storage
          this._jwtService.setToken(data.headers.get('x-auth'));

          // !setting jwtotken, now navigate to invoice tab
          this._router.navigate(['dashboard', 'invoices']);

        },
          err => { console.log(err); }
        );
    }

  }
}
