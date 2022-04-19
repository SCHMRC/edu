import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/service/http.service';
import { Teacher } from 'src/app/model/index'
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-handle-class-teacher',
  templateUrl: './handle-class-teacher.component.html',
  styleUrls: ['./handle-class-teacher.component.scss']
})
export class HandleClassTeacherComponent implements OnInit {
  teachers$: Observable<Teacher[]>;
  form: FormGroup;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.teachers$ = this.http.getTeachers()

  }

}
