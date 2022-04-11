import {animate, state, style, transition, trigger} from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { HttpService } from 'src/service/http.service';
import { UtilityService } from 'src/service/utility.service';
import { MODALSOURCE, ModalConfig } from 'src//assets/config/modal.config'
import {SelectionModel} from '@angular/cdk/collections';
import { FormTeacherComponent } from '../insert-data/form-teacher/form-teacher.component';
import * as SNACKBAR from 'src/assets/config/snackBar.config'
import { MatSnackBar } from '@angular/material/snack-bar';

interface Section{
  prima: string;
  seconda: string;
  terza: string;
}

@Component({
  selector: 'app-show-items',
  templateUrl: './show-items.component.html',
  styleUrls: ['./show-items.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ShowItemsComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Teacher>;
  selection = new SelectionModel<Teacher>(true, []);
  dataSource$: BehaviorSubject<MatTableDataSource<Teacher>> = new BehaviorSubject(null)
  columnsToDisplay = ['select','id','name', 'surname','in_service','status'];
  expandedElement: Teacher | null;
  teacher: Teacher;
  section: Section[] = [];
  section$: string[] = [];
  temp: any[] = []
  MODALSOURCE = MODALSOURCE;
  modalConfig: ModalConfig;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: HttpService,private  router: Router, private util: UtilityService, public dialog: MatDialog,private _snackBar: MatSnackBar) {
    this.util.showSpinner.next(true)}
  ngOnInit(): void {
    this.init()
  }

  init(){
    this.service.getTeachers().subscribe(data => {
      this.util.showSpinner.next(false)
      //subscribe?.unsubscribe()
      this.dataSource = new MatTableDataSource(data);
      this.dataSource$.next(this.dataSource)
    })
  }

  ngAfterViewInit() {
    this.dataSource$.subscribe(data =>{
      if(data){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  getInfo(expandedElement: Teacher){
    if(expandedElement){
      this.service.getTeacher(expandedElement.id).subscribe(teach =>{
        this.util.teacher$.next(teach)
          this.teacher = teach;
          let prima: string[] = []
          let seconda: string[] = []
          let terza: string[] = []
          this.teacher.classroom.forEach(element => {
            switch(element.year){
              case 'PRIMA': {prima.push(element.section)}break;
              case 'SECONDA': {seconda.push(element.section)}break;
              case 'TERZA': {terza.push(element.section)}break;
            }

          });

          let max: number;
          if(prima.length > seconda.length && prima.length > terza.length){
            max = prima.length
          }else if(seconda.length > terza.length){
            max = seconda.length
          }else {max = terza.length}
          this.section = [];
          let count = 0;
          while(max>0){
            let x: string;
            let y: string;
            let z: string;
            prima[count]? x = prima[count] : x = '-'
            seconda[count]? y = seconda[count] : y = '-'
            terza[count]? z = terza[count] : z = '-'
            let _section: Section = {
              prima: x,
              seconda: y,
              terza: z
            }
            this.section.push(_section)
            count++
            max--
          }
      })
      this.service.getSection().subscribe(data =>{this.section$ = data})
    }


  }

  onClick(surname,id){
    this.router.navigate(['home/show-items/'+ id])
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(){
    let teacher: Teacher[] = []
    teacher.push(this.teacher)
    this.modalConfig = {
      source: MODALSOURCE.ADDMATTER,
      matter: this.teacher.matters,
      teacher: teacher
    }
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: this.modalConfig,
    });
    dialogRef.afterClosed().subscribe(data=>{
      this.getInfo(teacher[0])

    })
  }

  removeData(){
    let removeTeacher: Teacher[] = this.selection.selected
    this.service.removeTeacher(removeTeacher).subscribe(data =>{
      this.init()
      this.selection.clear();
      this.openSnackBar(data.message, 'Ok!','snackbar-remove-success')
      console.log(data)
    })


  }

  openSnackBar(msg: string, error: string, color: string) {
    this._snackBar.open(msg,`status ${error}`,{
      duration: SNACKBAR.snackBarConfig.duration,
      panelClass: [color],
      horizontalPosition: SNACKBAR.snackBarConfig.horizontalPosition,
      verticalPosition: SNACKBAR.snackBarConfig.verticalPosition,
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  addData(){
    let closed = this.dialog.open(FormTeacherComponent,{
      width: '500px',
      disableClose: true
    });
    closed.beforeClosed().subscribe(data=>{
      this.init()
    })
  }
}
