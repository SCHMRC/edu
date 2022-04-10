import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalConfig } from 'src/assets/config/modal.config';
import * as SOURCE  from 'src/assets/config/modal.config';
import * as HUMANIST_MATTER from 'src/assets/label/label_matter';
import { LABEL_HUMANIST_MATTER, Select } from 'src/assets/label/label_matter';
import { LABEL_BUTTON } from 'src/assets/label/label_button';
import { HttpService } from 'src/service/http.service';
import { Matter } from 'src/app/model/matter';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  source: ModalConfig;
  LABEL_BUTTON =LABEL_BUTTON
  title: String;
  content: any[];
  selectedValue: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalConfig,
    private httpService: HttpService) { }

  ngOnInit(): void {
    let flag = false;
    let MATTER: Object[] = []
    HUMANIST_MATTER.LABEL_HUMANIST_MATTER.forEach(element => {
        MATTER.push(new Object(element))
        this.data.matter.forEach(matter =>{
          if(element.value == matter.matter){
            flag = true
          }
        })
    });
    switch(this.data.source){
      case SOURCE.MODALSOURCE.ADDMATTER: {
        let flagMatter = false;
        let temp: object[] = []
        if(flag && this.data.matter.length <4){
          MATTER.forEach((elementParent: Select) => {
            flagMatter = false;
            this.data.matter.forEach((elementChild: Matter) =>{
              if(elementParent.value == elementChild.matter){
                flagMatter = true
              }
            })
            if(!flagMatter){
              temp.push(elementParent)
            }
          });
        }else{
          temp = [];
          temp.push(new Object({value: 'None', viewValue: 'NO ADD MATTER'}))
        }
        this.title = 'Add Matter'
        this.content = temp
        break;
      }
    }

  }

  onClick(){
    switch(this.data.source){
      case SOURCE.MODALSOURCE.ADDMATTER: {
        let matter: Matter = new Matter(this.selectedValue, this.data.teacher)
        this.httpService.addMatter(matter).subscribe(data =>{
          console.log(data)
        })
        break;
      }
    }
  }

}
