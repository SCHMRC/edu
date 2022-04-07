import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Classroom, Year } from 'src/app/model/class';
import { Matter } from 'src/app/model/matter'
import { Teacher } from 'src/app/model/teacher';
import { HttpService } from 'src/service/http.service';
import { PreviewComponent } from './preview/preview.component';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormTeacherComponent } from './form-teacher/form-teacher.component';
import * as LABEL_BUTTON from 'src/assets/label/label_button'
import { UtilityService } from 'src/service/utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import * as SNACKBAR from 'src/assets/config/snackBar.config'


@Component({
  selector: 'app-insert-data',
  templateUrl: './insert-data.component.html',
  styleUrls: ['./insert-data.component.scss']
})
export class InsertDataComponent implements OnInit, OnDestroy {
  BUTTON = LABEL_BUTTON
  teacher: Teacher[] = []
  subscription: Subscription[] = [];
  files: File[] = [];
  formTeacher: FormGroup
  temp: Subscription;

  y: Subscription;

  flag: boolean = true


  @ViewChild(PreviewComponent) child!: PreviewComponent;


  constructor(
    private util: UtilityService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private http: HttpService)
    {}


  ngOnInit(): void {}

  ngDoCheck(){}

  ngAfterContentChecked(){}


  removeDuplicate(param: object[]): Teacher[] {
    let list: Teacher[] = []
    let temp: Teacher[] = []
    let classroom: Classroom[] = []
    param.forEach(elementP => {

      if(elementP['prima']){
       this.utilityClassroom(classroom,elementP['prima'],'prima')
      }
      if(elementP['seconda']){
        this.utilityClassroom(classroom,elementP['seconda'],'seconda')
      }
      if(elementP['terza']){
        this.utilityClassroom(classroom,elementP['terza'],'terza')
      }

      let matter: Matter[] = [];
      let temp_matter = new Matter(elementP['matter'][0])
      matter.push(temp_matter)
      elementP['matter'] = matter

      let teacher: Teacher = new Teacher('xxxx', Object.values(elementP)[0], elementP['matter'], classroom, Object.keys(elementP)[0]);
      list.push(teacher)
      classroom = [];
    });

    /**remove temp id */
    temp = list
    list = []
    temp.forEach(element => {
      let teacher = new Teacher(element.name, element.surname, element.matters, element.classroom)
      list.push(teacher)
    });
    return list

  }

  utilityClassroom(classroom: Classroom[], elementP: string, anno: string): void{
    if(elementP){
      if (elementP.length > 1 && elementP != '\r') {
        let temp = elementP.split('-')
        temp.forEach((obj: string) => {
          if (obj.includes('\r')) {
            obj = obj.replace('\r', '')
          }
          classroom.push(new Classroom(anno.toUpperCase(), obj))
        })
      } else if (elementP != '\r') {
        classroom.push(new Classroom(anno.toUpperCase(), elementP))
      }
    }
  }


  handleData(event) {
    if (event.data.length > 0) {
      this.teacher = event.data
    } else {
      this.files = []
    }
  }



  handleFiles(files: File[]) {
    this.teacher = [];
    files.forEach(element => {
      let reader = new FileReader();
      reader.onload = (event) => {
        let _teachers: object[] = []
        let _matter = new Set()

        let text = event.target.result.toString().split('\n');
        text.shift()
        text.forEach(element => {
          let obj = element.split('\t')
          if (obj[0] && element.length > 1) {
            let tempTeacher = { [obj[0]]: obj[1], matter: [obj[2]], prima: obj[3], seconda: obj[4], terza: obj[5] };
            _teachers.push(tempTeacher)
            _matter.add(obj[2])
          }
        });
        if (this.teacher.length >= 1) {
          this.removeDuplicate(_teachers).forEach(t => {
            this.teacher.push(t)
          })
        } else {
          this.teacher = this.removeDuplicate(_teachers)
        }
        if (this.teacher.length > 0) { this.flag = false }
      }
      reader.readAsText(element);
    });
  }


  onChange(input: any) {
    this.files.push(...input.addedFiles);
    this.handleFiles(this.files)
  }

  onSubmit() {
    this.util.showSpinner.next(true)
    this.subscription.push(this.http.insertTeachs(this.teacher).subscribe(
      data => { this.teacher = [], this.files = []; this.openSnackBar(data.message, 'Ok!','snackbar-success'); this.util.showSpinner.next(false) },
      error => { this.openSnackBar(error.error.message, error.status,'snackbar-error'); this.util.showSpinner.next(false) }
    ))
  }
  openDialog() {
    this.dialog.open(FormTeacherComponent,{
      width: '500px',
      disableClose: true
    });
  }

  handleForm(event: FormGroup) {
    let form = event.value
    if (event.valid) {
      this.formTeacher = event
    }
    (event.status == 'VALID') ? this.flag = false : this.flag = true;
  }

  handleReset(event: boolean) {
    if (event) { this.teacher = []; this.flag = true }
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    if(this.files.length > 0){
      this.teacher = [];
      this.handleFiles(this.files)
    }else{
      this.files = []
      this.teacher = [];
      this.child.removeAll()

    }
    this.flag = true;
  }

  openSnackBar(msg: string, error: string, color: string) {
    this._snackBar.open(msg,`status ${error}`,{
      duration: SNACKBAR.snackBarConfig.duration,
      panelClass: [color],
      horizontalPosition: SNACKBAR.snackBarConfig.horizontalPosition,
      verticalPosition: SNACKBAR.snackBarConfig.verticalPosition,
    });
  }


  ngOnDestroy(): void {
    this.subscription.forEach(element => {
      element?.unsubscribe()
    });
  }

}
