import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formGrp: FormGroup;
  isSpinnerLoading = false;

  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.initializeForm();
  }

  private initializeForm() {
    this.formGrp = this._formBuilder.group({
      email: ['', Validators.required]
    });
  }

  onFormSubmit() {
    this.isSpinnerLoading = true;
    this._authService.forgotPassword(this.formGrp.value)
      .subscribe(data => {
        console.log(data);
        this._snackBar.open(data.message['message'], 'Success', {
          duration: 4000
        });
      },
        err => { console.log(err); },
        () => {
          this.isSpinnerLoading = false;
        }
      );
  }
}
