import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/service/http.service';
import { Teacher } from 'src/app/model/index'
import { Observable } from 'rxjs';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-handle-class-teacher',
  templateUrl: './handle-class-teacher.component.html',
  styleUrls: ['./handle-class-teacher.component.scss']
})
export class HandleClassTeacherComponent implements OnInit {
  teachers$: Observable<Teacher[]>;
  form: UntypedFormGroup;

  constructor(private http: HttpService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id_class = this.activateRoute.snapshot.params['id'] as string
    this.teachers$ = this.http.getTeachersFromClass(id_class)


  }

}
