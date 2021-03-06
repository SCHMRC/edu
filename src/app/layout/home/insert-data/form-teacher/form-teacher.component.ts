import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LABEL_MATTER, Select } from './../../../../../assets/label/label_matter';
import { NgModel } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as LABEL_BUTTON from 'src/assets/label/label_button';
import { UtilityService } from 'src/service/utility.service';
import { InsertDataComponent } from '../insert-data.component';

@Component({
  selector: 'app-form-teacher',
  templateUrl: './form-teacher.component.html',
  styleUrls: ['./form-teacher.component.scss']
})
export class FormTeacherComponent implements OnInit {
  BUTTON = LABEL_BUTTON;
  form: FormGroup;
  LABELMATTER: Select[] = LABEL_MATTER
  matter: BehaviorSubject<string[]> = new BehaviorSubject([]);
  tempMatter: string[] = []
  @Output() dataOut = new EventEmitter();
  @Output() resetOut = new EventEmitter();

  constructor(
    private util: UtilityService,
    private fb: FormBuilder) {

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

  initStream(){
    this.dataOut.emit(this.form);
  }

  addMatter(evento){
    this.tempMatter = [];
    this.tempMatter.push(evento.value);
    this.form.addControl('matterTemp',new FormControl('', Validators.required))
    this.form.controls['matterTemp'].setValue(evento.value)
    this.form.controls['matters'].setValue(this.tempMatter)
    //matter.valueChanges.subscribe(data => {this.tempMatter = []; this.tempMatter.push(data); this.matter.next(this.tempMatter)}).unsubscribe()
  }

  onSubmit(){
    this.toUpperFirsChar(this.form.get('name').value, 'name')
    this.toUpperFirsChar(this.form.get('surname').value, 'surname')
    this.util.formModal.next(this.form)
    this.dataOut.emit(this.form)
  }

  clear(){
    this.form.reset()
    this.resetOut.emit(true);
  }

  toUpperFirsChar(param: string, value: string): void{
    this.form.get(value).setValue(param.charAt(0).toUpperCase() + param.slice(1))
  }

}
