import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as LABEL_ERROR from 'src/assets/label/label_error'
import * as LABEL_FORM from 'src/assets/label/label_form'
import * as LABEL_BUTTON from 'src/assets/label/label_button'
import { AuthService } from 'src/service/auth.service';
import { User } from 'src/app/model/user';
import { UtilityService } from 'src/service/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  LABEL_ERROR = LABEL_ERROR
  LABEL_FORM = LABEL_FORM
  LABEL_BUTTON = LABEL_BUTTON
  constructor(
    private fb: FormBuilder,
    private util: UtilityService,
    private router: Router,
    private auth : AuthService)
    {}

  ngOnInit(): void {
    this.initForm();
    this.controlParam();


  }

  initForm(){
    if(localStorage.getItem('token')){
      this.form = this.fb.group({
        email: [localStorage.getItem('token')],
        password: []
      })
    }else{
      this.form = this.fb.group({
        email: ['',[Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(10)]]
      })
    }

  }

  controlParam(){
     let email$ = this.form.get('email') as AbstractControl
     let password$ = this.form.get('password') as AbstractControl

  }

  onSubmit(){
    //let emailSHA = sha512.sha512(this.form.get('email').value);
    //let pwSHA = sha512.sha512(this.form.get('password').value);
    let emailSHA = this.form.get('email').value;
    let pwSHA = this.form.get('password').value;
    let user: User = {
      email: emailSHA,
      password: pwSHA
    };

    let authString = "Basic " + window.btoa(user.email + ":" + user.password);
    sessionStorage.setItem("AuthToken",authString);

      this.util.credential.next(authString)

      this.auth.login().subscribe(
        data =>{
          this.router.navigate(['home'])
        },
        error=>{sessionStorage.clear() })


  }

  onSignin(){
    this.router.navigate(['signin'])
  }
}
