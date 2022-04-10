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
    return this.http.post(`${this.URI}/api/classroom/list`,classrom);
  }

  getAllClass(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URI}/api/class`);
  }

  addMatter(matter: Matter): Observable<any>{
    return this.http.post(`${this.URI}/api/matter`, matter)
  }
  removeMatter(matter: Matter): Observable<any>{
    return this.http.delete<Matter>(`${this.URI}/api/matter/${matter.teachers[0].id}/${matter.matter}`)
  }
}
