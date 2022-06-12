import { Student } from './../../../../../model/student';
import { Component, OnInit } from '@angular/core';
import { SRC_IMG } from './../../../../../../assets/label/label_button';

@Component({
  selector: 'app-student-component',
  templateUrl: './student-component.component.html',
  styleUrls: ['./student-component.component.scss']
})
export class StudentComponentComponent implements OnInit {

  img_src = SRC_IMG;
  flag: boolean = false;
  students: Student[] = [];



  constructor() {

  }

  ngOnInit(): void {
  }

  onclick(param: number){
    (param != 2) ? this.flag = false : this.flag = true;
  }

}
