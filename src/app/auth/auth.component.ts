import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {


  authForm: FormGroup;
  formTitle = '';
  isSpinnerLoading = false;
  // subscription: Subscription;

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

    this.isSpinnerLoading = true;

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
          err => { console.log(err); },
          () => { // ! 3rd argum of subcribe() i.e->
            // !oncompletetion (irrespective of succes/err) this below block of code will be called
            // this.isSpinnerLoading = false;
          }
        );

    } else {
      this._authService.login(this.authForm.value)
        .subscribe(data => {

          // !setting jwttoken in local storage
          this._jwtService.setToken(data.headers.get('x-auth'));

          // !setting jwtotken, now navigate to invoice tab
          this._router.navigate(['dashboard', 'invoices']);

        },
          err => { console.log('autCOmponent', err); },
          () => { // ! 3rd argum of subcribe() i.e->
            // !oncompletetion (irrespective of succes/err) this below block of code will be called
            // this.isSpinnerLoading = false;
          }
        );
    }

  }

  /*   ngOnDestroy(): void {
      this.subscription.unsubscribe();
    } */

  googleAuthHandler() {
    this._authService.googleAuth()
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }

  forgotPasswordHandler() {
    this._router.navigate(['/forgotpassword']);
  }
}
