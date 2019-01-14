import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  formGrp: FormGroup;
  isSpinnerLoading = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.formGrp = this._formBuilder.group({
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  onFormSubmit() {
    // console.log(this.formGrp.value);
    if (this.formGrp.value.password !== this.formGrp.value.confirmpassword) {
      console.log('Password and confirm password did not match');
      return;
    }
  }
}
