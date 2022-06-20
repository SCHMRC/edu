import { Student } from './../app/model/student';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matter } from 'src/app/model/matter';
import { environment } from 'src/environments/environment';
import {Classroom,Week,Teacher,Day,Ora,Year } from './../app/model/index'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  URI = environment.apiURI

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.URI}/api/student`)
  }

  insertStudent(student: Student): Observable<any>{
    return this.http.post(`${this.URI}/api/student`,student)
  }


  getTeachersFromClass(id_class): Observable<Teacher[]>{
    console.log(`${this.URI}/api/classroom/?id=${id_class}`)
    return this.http.get<any[]>(`${this.URI}/api/classroom/${id_class}`)
    }




  getSection(): Observable<string[]>{
    return this.http.get<string[]>(`${this.URI}/api/classroom`)

  }


  removeTeacher(teachers: Teacher[]): Observable<any>{
    return this.http.post(`${this.URI}/api/teacher/teachers/remove`,teachers)
  }

  insertTeachs(teachers: Teacher[]): Observable<any>{
    return this.http.post(`${this.URI}/api/teacher/teachers`, teachers)
  }

  getTeacher(id: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.URI}/api/teacher/${id}`)
  }

  getTeachers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URI}/api/teacher`)
  }

  insertRun(ore: Ora[]): Observable<any>{
    return this.http.post(`${this.URI}/items/`,ore)
  }

  insertAllClass(classrom: Classroom[]): Observable<any>{
    return this.http.post(`${this.URI}/api/classroom/insert`,classrom);
  }

  getAllClass(): Observable<Classroom[]> {
    return this.http.get<any[]>(`${this.URI}/api/classroom/all`);
  }

  addMatter(matter: Matter): Observable<any>{
    return this.http.post(`${this.URI}/api/matter`, matter)
  }
  removeMatter(matter: Matter): Observable<any>{
    return this.http.delete<Matter>(`${this.URI}/api/matter/${matter.teachers[0].id}/${matter.matter}`)
  }
  removeClass(classroom: Classroom): Observable<any>{
    return this.http.delete<Classroom>(`${this.URI}/api/classroom/${classroom.year}/${classroom.section}`)
  }
}
