import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

/**LABEL */
import * as LABEL_FORM from 'src/assets/label/label_form'
import * as LABEL_ERROR from 'src/assets/label/label_error'
import * as LABEL_BUTTON from 'src/assets/label/label_button'

import { AuthService } from 'src/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form: UntypedFormGroup
  LABEL_FORM = LABEL_FORM
  LABEL_ERROR = LABEL_ERROR
  LABEL_BUTTON = LABEL_BUTTON

  constructor(
    private fb: UntypedFormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private signin: AuthService ) { }

  ngOnInit(): void {
    this.initFormSignin()
    this.form.get('name').setValue('Marco')
    this.form.get('surname').setValue('Schiavo')
    this.form.get('email').setValue('schiavo.marco05@gmail.com')
    this.form.get('phone').setValue('3276774029')
    this.form.get('password').setValue('Pa55word')
  }

  initFormSignin(){
    this.form = this.fb.group({
      name: ['',[Validators.required]],
      surname: ['',[Validators.required]],
      email: ['',[Validators.email, Validators.required]],
      phone: ['',[Validators.required,Validators.minLength(8) , Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      password: ['',[Validators.required]]
    })
  }

  onSubmit(){
    this.signin.signin(this.form.value).subscribe(
      data=>{
        this.router.navigate(['login'])

      },
      error=>{
        this.openDialog(error.status)
        console.log(error)
      })
  }

  openDialog(msg: string) {
    this.dialog.open(ModalComponent, {
      data: {
        msg: msg,
      },
    });
  }

}
