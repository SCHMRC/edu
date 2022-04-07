import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilityService } from 'src/service/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  spinner$: BehaviorSubject<boolean>
  value = 100;

  constructor(
    private util: UtilityService
  ){}

  ngOnInit(){
    this.spinner$ = this.util.showSpinner

  }


}
