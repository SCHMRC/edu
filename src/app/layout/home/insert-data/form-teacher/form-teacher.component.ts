import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LABEL_MATTER, Select } from './../../../../../assets/label/label_matter';
import { NgModel } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-form-teacher',
  templateUrl: './form-teacher.component.html',
  styleUrls: ['./form-teacher.component.scss']
})
export class FormTeacherComponent implements OnInit {
  form: FormGroup;
  LABELMATTER: Select[] = LABEL_MATTER
  matter: BehaviorSubject<string[]> = new BehaviorSubject([]);
  tempMatter: string[] = []
  @Output() dataOut = new EventEmitter();
  @Output() resetOut = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['',[Validators.required]],
      surname: [null,[Validators.required]],
      matter: [null,[Validators.required]],
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
    let matter = this.form.get('matter')
    matter.valueChanges.subscribe(data => {this.tempMatter = []; this.tempMatter.push(data); this.matter.next(this.tempMatter)})
    let adress = this.form.get('adress')
    let phone = this.form.get('phone')
    let email = this.form.get('email')
    let edumail = this.form.get('edumail')

  }

  initStream(){
    console.log(this.matter.getValue())


      this.form.controls['matter'].setValue(this.matter.getValue())


    console.log(this.form.value)
    //this.dataOut.emit(this.form);
  }

  addMatter(){
  }

  clear(){
    this.form.reset()
    this.resetOut.emit(true);
  }

}
