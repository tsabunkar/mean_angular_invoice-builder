import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatRadioChange } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-dailog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss'],
})
export class DialogFormComponent implements OnInit {


  clientForm: FormGroup;

  constructor(public _dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.initialClientFormState();
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

}

