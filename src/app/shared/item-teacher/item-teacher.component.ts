import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Teacher } from './../../model/teacher';

@Component({
  selector: 'app-item-teacher',
  templateUrl: './item-teacher.component.html',
  styleUrls: ['./item-teacher.component.scss']
})
export class ItemTeacherComponent implements OnInit {
  @Input() teacherIn: Teacher;
  @Output() teacherOut = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.teacherOut.emit('')
  }

}
