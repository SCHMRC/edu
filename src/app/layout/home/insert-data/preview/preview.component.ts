import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Teacher } from 'src/app/model/teacher';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Input() dataIn: Teacher[];
  @Output() dataOut = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  removeAll(){
    this.dataIn = [];
    this.dataOut.emit(this.dataIn)
  }

  remove(teacher: Teacher){
   const index =  this.dataIn.indexOf(teacher)
   if (index >= 0) {
    this.dataIn.splice(index, 1);
  }
  this.dataOut.emit(this.dataIn)

  }

}
