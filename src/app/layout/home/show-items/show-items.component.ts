import {animate, state, style, transition, trigger} from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';
import { HttpService } from 'src/service/http.service';
import { UtilityService } from 'src/service/utility.service';

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
  dataSource$: BehaviorSubject<MatTableDataSource<Teacher>> = new BehaviorSubject(null)
  columnsToDisplay = ['id','name', 'surname','in_service','status'];
  expandedElement: Teacher | null;
  teacher: Teacher;
  section: Section[] = [];
  temp: any[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: HttpService,private  router: Router, private util: UtilityService) {
    this.util.showSpinner.next(true)
    let subscribe = this.service.getTeachers().subscribe(data => {
      this.util.showSpinner.next(false)
      subscribe?.unsubscribe()
      this.dataSource = new MatTableDataSource(data);
      this.dataSource$.next(this.dataSource)
    })
  }
  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource$.subscribe(data =>{
      if(data){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  getInfo(expandedElement){
    if(expandedElement){
      this.service.getTeacher(expandedElement.id).subscribe(teach =>{
        console.log(teach)
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
}
