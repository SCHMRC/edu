import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/service/http.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute,private httpService: HttpService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(data=>{
      this.httpService.getTeacher(data['id']).subscribe(teacher =>{
        console.log(teacher)
      })


    })

  }

}
