import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit, Input} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Teacher } from 'src/app/model';
import { Matter } from 'src/app/model/matter';
import { LABEL_HUMANIST_MATTER_STRING, LABEL_MATH_MATTER_STRING, LABEL_MATTER_STRING } from 'src/assets/label/label_matter'
import { HttpService } from 'src/service/http.service';
import { UtilityService } from 'src/service/utility.service';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {
  @Input() teacherIn: Teacher;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  placeholder = '...add Matter'
  mattersCtrl = new UntypedFormControl();
  filteredmatterss: Observable<string[]>;
  matterss: string[] = [];
  temp: string[] = []
  allmatterss: string[] = [];
  flag: number;

  @ViewChild('mattersInput') mattersInput: ElementRef<HTMLInputElement>;

  constructor(
    private util: UtilityService,
    private httpService: HttpService) {}

  ngOnInit(): void {
    this.util.teacher$?.subscribe(teach =>{
      this.allmatterss = []
      this.matterss = [];
      this.temp = [];



      teach?.matters.forEach(matter=>{
        this.matterss.push(matter.matter)
        if(LABEL_HUMANIST_MATTER_STRING.includes(matter.matter)){
          this.flag = 0;
        }
        if(LABEL_MATH_MATTER_STRING.includes(matter.matter)){
          this.flag = 1;
        }
        if(LABEL_MATTER_STRING.includes(matter.matter)){
          this.flag = 2;
        }
      })

      if(this.flag == 0){
        LABEL_HUMANIST_MATTER_STRING.forEach(element=>{
          this.temp.push(element)
        })
        this.allmatterss = this._compareList(this.temp, this.matterss)
      }

      if(this.flag == 1){
        LABEL_MATH_MATTER_STRING.forEach(element=>{
          this.temp.push(element)
        })
        this.allmatterss = this._compareList(this.temp, this.matterss)
      }

      if(this.flag == 2){
        LABEL_MATTER_STRING.forEach(element=>{
          this.temp.push(element)
        })
        this.allmatterss = this._compareList(this.temp, this.matterss)
      }


      this._setControl()
      this._filterSelected()
      this._onSelect()
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    let flag: boolean = false;

    // Add our matters
    switch(this.flag){
      case 0:{
        if(LABEL_MATH_MATTER_STRING.includes(value)){
          flag = true
        }
        break;
      }
      case 1:{
        if(LABEL_HUMANIST_MATTER_STRING.includes(value)){
          flag = true
        }
        break;
      }
      default:{
        if(LABEL_MATTER_STRING.includes(value)){
          flag = true
        }
        break;
      }
    }
    if (flag) {
      this.matterss.push(value);
      this.allmatterss = this._compareList(this.temp, this.matterss)
      this._filterSelected()
      this._setControl()
    }
    // Clear the input value
    event.chipInput!.clear();

    this.mattersCtrl.setValue(null);
  }

  remove(matters: string): void {
    const index = this.matterss.indexOf(matters);
    console.log(this.allmatterss.length)
    if (this.matterss.length  > 1) {
      this.matterss.splice(index, 1);
      this.allmatterss = this._compareList(this.temp, this.matterss)
      this._filterSelected()
      this._setControl()
      let teacher: Teacher[] = [];
      teacher.push(this.teacherIn)
      if(matters){
        let matter = new Matter(matters, teacher)
        this.httpService.removeMatter(matter).subscribe(data =>{console.log(data)})
      }
    }
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    this.matterss.push(event.option.viewValue);
    this.allmatterss = this._compareList(this.temp, this.matterss)
    this._filterSelected()
    this._setControl()
    this._onSelect()
    this.mattersInput.nativeElement.value = '';
    this.mattersCtrl.setValue(null);
  }

  private _onSelect():void{
    let teacher: Teacher[] = [];
    teacher.push(this.teacherIn)
    if(this.mattersCtrl.value){
      let matter = new Matter(this.mattersCtrl.value, teacher)
      this.httpService.addMatter(matter).subscribe(data=>{console.log(data)})
    }
  }

  private _filterSelected():void{
    this.filteredmatterss = this.mattersCtrl.valueChanges.pipe(
      startWith(null),
      map((matters: string | null) => (matters ? this._filter(matters) : this.allmatterss.slice())),
    );
  }

  private _compareList(param1: any[], param2: any[]): any[]{
    let resultList: string[] = []
    param1.forEach(x=>{
      let flagT =false
      param2.forEach(y=>{
        if(x == y){
          flagT = true
        }
      })
      if(!flagT){
        if(!resultList.includes(x)){
          resultList.push(x)
        }
      }
    })
    return resultList

  }

  private _setControl(){
    if(this.matterss.length >= 4){
      this.mattersCtrl.disable()
      this.placeholder = ''
    }else{
      this.mattersCtrl.enable()
      this.placeholder = '...add Matter'
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allmatterss.filter(matters => matters.toLowerCase().includes(filterValue));
  }
}
