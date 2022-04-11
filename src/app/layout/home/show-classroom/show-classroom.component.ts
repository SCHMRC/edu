import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Classroom } from 'src/app/model';
import { HttpService } from 'src/service/http.service';
import { Task } from 'src/assets/config/task.config'
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-show-classroom',
  templateUrl: './show-classroom.component.html',
  styleUrls: ['./show-classroom.component.scss']
})
export class ShowClassroomComponent implements OnInit {
  task: Task = {
    name: 'Select all year',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Prima', completed: false, color: 'primary'},
      {name: 'Seconda', completed: false, color: 'accent'},
      {name: 'Terza', completed: false, color: 'warn'},
    ],
  };
  hover: boolean[][] = [[],[],[]]
  section: string;
  prime: Classroom[]= [];
  seconde: Classroom[] = [];
  terze: Classroom[] = [];
  allComplete: boolean = false;

  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {this.init()}

  init(){
    this.httpService.getAllClass().subscribe(data =>{
      this.prime = []
      this.seconde = []
      this.terze = []
      data.forEach(element => {
        switch(element.year){
          case 'PRIMA': this.prime.push(element); this.hover[0].push(true);break;
          case 'SECONDA': this.seconde.push(element); this.hover[1].push(true); break;
          case 'TERZA': this.terze.push(element); this.hover[2].push(true); break;
        }

      });

    })
  }

  initTask(){
    this.task  = {
      name: 'Select all year',
      completed: false,
      color: 'primary',
      subtasks: [
        {name: 'Prima', completed: false, color: 'primary'},
        {name: 'Seconda', completed: false, color: 'accent'},
        {name: 'Terza', completed: false, color: 'warn'},
      ],
    };

  }

  onHover(row,index){
   this.hover[row][index] = false

  }

  onNotHover(row,index){
   this.hover[row][index] = true
  }


  handleClass(year: string, section: string){
    this.router.navigate([`${year}_${section}`], {relativeTo: this.route})
  }

  remove(year: string, section: string){
    let classroom : Classroom = new Classroom(year,section)
    this.httpService.removeClass(classroom).subscribe(data=>this.init())
  }

  addData(form: any){
    console.log(form)
    let section: string = form['section'];
    let classList: Classroom[] = []
    if(form['Prima']){
      let x = new Classroom('PRIMA',section.toUpperCase())
      classList.push(x)
    }
    if(form['Seconda']){
      let y = new Classroom('SECONDA',section.toUpperCase())
      classList.push(y)
    }
    if(form['Terza']){
      let z = new Classroom('TERZA',section.toUpperCase())
      classList.push(z)
    }
    this.httpService.insertAllClass(classList).subscribe(data =>{
      this.allComplete = false
      this.section = ''
      this.initTask()
      this.init()
    })

  }
  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

}
