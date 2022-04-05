import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {trigger, state, style, animate, transition} from '@angular/animations';
import * as LABEL_MENU from 'src/assets/label/label_menu'

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
      description: 'Insert one or more teachers',
      key: 'Insert teacher',
      value: 'insert'
    },
    {
      icon: 'group',
      description: 'Show all teachers in DB',
      key: 'Show teacher',
      value: 'show-items'
    },
    {
      icon: 'school',
      description: 'Insert and show class ',
      key: 'Insert/show Class',
      value: 'show-class'
    },
    {
      icon: 'functions',
      description: 'Setting/Generate Time Table',
      key: 'Time Table',
      value: 'show-time-table'
    },
  ];

  reason = '';

  constructor(private router: Router){}

  ngOnInit(): void {
    this.bool.subscribe(flag =>{
      this.flag = flag
    })

  }


  close() {
    console.log('test')
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
