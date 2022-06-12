import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { LABEL_MATTER, Select } from './../../../../../assets/label/label_matter';
import { NgModel } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as LABEL_BUTTON from 'src/assets/label/label_button';
import { UtilityService } from 'src/service/utility.service';
import { InsertDataComponent } from '../insert-data.component';
import { Classroom, Teacher } from 'src/app/model';
import { Matter } from 'src/app/model/matter';
import { HttpService } from 'src/service/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as SNACKBAR from 'src/assets/config/snackBar.config'

@Component({
  selector: 'app-form-teacher',
  templateUrl: './form-teacher.component.html',
  styleUrls: ['./form-teacher.component.scss']
})
export class FormTeacherComponent implements OnInit {
  BUTTON = LABEL_BUTTON;
  form: UntypedFormGroup;
  formTeacher: Teacher[] = [];
  LABELMATTER: Select[] = LABEL_MATTER
  matter: BehaviorSubject<string[]> = new BehaviorSubject([]);
  tempMatter: string[] = []

  constructor(
    private util: UtilityService,
    private http: HttpService,
    private _snackBar: MatSnackBar,
    private fb: UntypedFormBuilder) {

   }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['',[Validators.required]],
      surname: [null,[Validators.required]],
      matterTemp: [null,[Validators.required]],
      matters: [null,[Validators.required]],
      adress: ['',[]],
      phone: [null,[Validators.pattern('[0-9]*'),Validators.minLength(8)]],
      email: [null,[Validators.email, Validators.required]],
      edumail: [null,[Validators.email, Validators.required]]
    })

    this.initFormControl()
  }

  initFormControl(){
    let name = this.form.get('name')
    let surname = this.form.get('surname')
    let adress = this.form.get('adress')
    let phone = this.form.get('phone')
    let email = this.form.get('email')
    let edumail = this.form.get('edumail')

    name.valueChanges.subscribe(name => {

    })

  }

  addMatter(evento){
    this.tempMatter = [];
    this.tempMatter.push(evento.value);
    this.form.addControl('matterTemp',new UntypedFormControl('', Validators.required))
    this.form.controls['matterTemp'].setValue(evento.value)
    this.form.controls['matters'].setValue(this.tempMatter)
  }

  onSubmit(){
    this.util.showSpinner.next(true)
    this.formTeacher = [];
    let classroom: Classroom[] = [];
    this.toUpperFirsChar(this.form.get('name').value, 'name')
    this.toUpperFirsChar(this.form.get('surname').value, 'surname')
    let matter: Matter[] = [];
    let teacher: Teacher = new Teacher(
      this.form.get('name').value,
      this.form.get('surname').value,
      this.form.get('matters').value,
      classroom,
      this.form.get('email').value,
      this.form.get('edumail').value,
      this.form.get('phone').value,
      this.form.get('adress').value,
      )
    this.formTeacher.push(teacher)
    this.http.insertTeachs(this.formTeacher).subscribe(
      data=>{console.log(data);this.openSnackBar(data.message, 'Ok!','snackbar-success');this.util.showSpinner.next(false) },
      error => { console.log(error);this.openSnackBar(error.error.message, error.status,'snackbar-error');this.util.showSpinner.next(false)})
  }

  clear(){
    this.form.reset()
  }

  toUpperFirsChar(param: string, value: string): void{
    this.form.get(value).setValue(param.charAt(0).toUpperCase() + param.slice(1))
  }

  openSnackBar(msg: string, error: string, color: string) {
    this._snackBar.open(msg,`status ${error}`,{
      duration: SNACKBAR.snackBarConfig.duration,
      panelClass: [color],
      horizontalPosition: SNACKBAR.snackBarConfig.horizontalPosition,
      verticalPosition: SNACKBAR.snackBarConfig.verticalPosition,
    });
  }

}
