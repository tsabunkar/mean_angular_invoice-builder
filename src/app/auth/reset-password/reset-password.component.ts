import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  formGrp: FormGroup;
  isSpinnerLoading = false;
  private tokenFetchedFromParams = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.initializeForm();
    console.log(this._route.snapshot.params['token']);
    this.tokenFetchedFromParams = this._route.snapshot.params['token'];
  }

  private initializeForm() {
    this.formGrp = this._formBuilder.group({
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  onFormSubmit() {
    // console.log(this.formGrp.value);
    const { password, confirmpassword } = this.formGrp.value;
    if (password !== confirmpassword) {
      // console.log('Password and confirm password did not match')
      this._snackBar.open('Password and confirm password didnot match', 'Warning', {
        duration: 4000
      });
      return;
    }

    const body = {
      token: this.tokenFetchedFromParams,
      password: password
    };
    this.isSpinnerLoading = true;
    this._authService.resetPassword(body)
      .subscribe(data => {
        this._snackBar.open('Password updated successfully', 'Success', {
          duration: 3000
        });
        this._router.navigate(['/login']);
      },
        err => { this.errorHandler(err, 'Something went wrong while updating the password'); },
        () => { this.isSpinnerLoading = false; }
      );
  }

  private errorHandler(error, message) {
    this.isSpinnerLoading = false;
    this.openSnackBar(message, 'Error');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
