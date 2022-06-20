import { FormStudentComponent } from './form-student/form-student.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-insert-student',
  templateUrl: './insert-student.component.html',
  styleUrls: ['./insert-student.component.scss']
})
export class InsertStudentComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  addStudent(): void{
    const dialogRef = this.dialog.open(FormStudentComponent, {
      disableClose: true,
      width: '500px',
      data: {},
    });
  }

}
