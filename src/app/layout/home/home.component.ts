import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {trigger, state, style, animate, transition} from '@angular/animations';
import * as LABEL_MENU from 'src/assets/label/label_menu'
import {LABEL_TOOLTIP} from 'src/assets/label/label_button'

export interface Path{
  icon: string,
  description: string,
  key: string,
  value: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})

export class HomeComponent implements OnInit {
  LABEL_MENU =LABEL_MENU
  sidenavWidth = 4;
  temp: BehaviorSubject<number> = new BehaviorSubject(4)
  bool: BehaviorSubject<boolean> = new BehaviorSubject(false)
  state: string = 'default';
  flag: boolean
  @ViewChild('sidenav') sidenav: MatSidenav;

  routers: Path[] = [
    {
      icon: 'person_add',
      description: LABEL_TOOLTIP.person_add,
      key: 'Insert teacher',
      value: 'insert'
    },
    {
      icon: 'group',
      description: LABEL_TOOLTIP.group,
      key: 'Show teacher',
      value: 'show-items'
    },
    {
      icon: 'face_5',
      description: LABEL_TOOLTIP.student,
      key: 'Insert/show student',
      value: 'insert-student'
    },
    {
      icon: 'school',
      description: LABEL_TOOLTIP.school,
      key: 'Insert/show Class',
      value: 'show-class'
    },
    {
      icon: 'functions',
      description: LABEL_TOOLTIP.functions,
      key: 'Time Table',
      value: 'show-time-table'
    },
  ];

  reason = '';

  constructor(private router: Router){

  }

  ngOnInit(): void {
    this.bool.subscribe(flag =>{
      this.flag = flag
    })

  }


  close() {
    this.sidenav.close();
  }
  navigateto(param: string){
    if(this.temp.getValue()!= 4){
      this.onClick()
    }

    this.router.navigate([`home/${param}`])

  }

  onClick(){
    if(this.bool.getValue()){
      this.decrease()
      this.bool.next(false)
      return
    }else{
      this.increase()
      this.bool.next(true)
      return
    }


  }

  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
}

  increase() {
      let interval = setInterval(()=>{
        let x = this.temp.getValue()
        if(x>=15){
          clearInterval(interval)
          return
        }
        this.temp.next(x+1)

      },10)
	}

	decrease() {
    let interval = setInterval(()=>{
      let x = this.temp.getValue()
      if(x<=4){
        clearInterval(interval)
        return
      }
      this.temp.next(x-1)

    },10)
	}

  routing(param: string){
    sessionStorage.clear();
    this.router.navigate([`${param}`])

  }
}
