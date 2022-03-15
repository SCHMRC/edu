import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/service/http.service';

@Component({
  selector: 'app-show-classroom',
  templateUrl: './show-classroom.component.html',
  styleUrls: ['./show-classroom.component.scss']
})
export class ShowClassroomComponent implements OnInit {

  constructor(private httlService: HttpService) { }

  ngOnInit(): void {
    this.httlService.getAllClass().subscribe(data =>{console.log(data)})
  }

}
