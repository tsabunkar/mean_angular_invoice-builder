import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatRadioChange, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-dailog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss'],
})
export class DialogFormComponent implements OnInit {

  mode = 'Create Client';
  clientForm: FormGroup;

  constructor(public _dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _formBuilder: FormBuilder,
    private _clientService: ClientService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.initialClientFormState();
    if (this._data.clientId) { // edit mode
      this.setClientFormValueInEditMode(this._data.clientId);
      this.mode = 'Edit Client';
    }

  }

  onCloseForm(): void {
    this._dialogRef.close();
  }

  private initialClientFormState() {
    this.clientForm = this._formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'gender': [null, Validators.required],
      'email': ['', Validators.required],
    });
  }

  setClientFormValueInEditMode(clientId) {
    this._clientService.getClientById(clientId)
      .subscribe(client => {
        this.clientForm.patchValue(client['data']);
      }, err => this.errorHandler(err, 'Failed to get client'));
  }

  private errorHandler(error, message) {
    console.error(error);
    this.openSnackBar(message, 'Error');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}

