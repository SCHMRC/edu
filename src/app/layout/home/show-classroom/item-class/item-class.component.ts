import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-class',
  templateUrl: './item-class.component.html',
  styleUrls: ['./item-class.component.scss']
})
export class ItemClassComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


}
