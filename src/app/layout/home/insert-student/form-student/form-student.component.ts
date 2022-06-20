import { UtilityService } from 'src/service/utility.service';
import { Classroom } from 'src/app/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/service/http.service';
import { Observable } from 'rxjs';
import { Student } from 'src/app/model/student';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss']
})
export class FormStudentComponent implements OnInit {
  form: FormGroup;
  behavior: string[] = [];
  height: string[] = [];
  classe: Observable<Classroom[]>;
  bes: string[] = [];

  constructor(private fb: FormBuilder, private service: HttpService, private utility: UtilityService) { }

  ngOnInit() {
    this.bes = ['Disabilità legge 104 comma 3','Disabilità legge 104 comma 1','Svantaggio socio/economico','DSA']
    this.behavior = [
      'Ingestibile','Agitato','Iperattivo','Irrequieto','Mansueto','Tranquillo'
    ];
    this.height = ['Alto','Medio','Basso'];
    this.classe = this.service.getAllClass();
    this.form = this.fb.group({
      name: [[],[Validators.required]],
      surname: [[],[Validators.required]],
      gender: [[],[Validators.required]],
      height: [[],[Validators.required]],
      behavior: [[],[Validators.required]],
      course: [[],[Validators.required]],
      bes: [[],[Validators.required]]
    })
  }

  onclick(){
   let student: Student = this.utility.factoryStudent(this.form.value);
  this.service.insertStudent(student).subscribe(data=>{
    console.log(data)
  })
  }

}
