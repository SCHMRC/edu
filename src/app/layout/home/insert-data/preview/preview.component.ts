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
  @Output() previewOut = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  removeAll(){
    this.dataIn = [];
    this.dataOut.emit({data: this.dataIn, event: 'preview'})
    this.previewOut.emit(true)
  }

  remove(teacher: Teacher){
   const index =  this.dataIn.indexOf(teacher)
   if(this.dataIn.length != 0){
    if (index >= 0) {
      this.dataIn.splice(index, 1);
    }
   }
  this.dataOut.emit({data: this.dataIn, event: 'preview'})
  this.previewOut.emit(true)

  }

}
