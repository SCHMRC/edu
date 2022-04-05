import { Component, OnInit,EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import {LABEL_MATTER} from 'src/assets/label/label_matter';
import { Subscription } from 'rxjs';
import { Classroom, Year } from 'src/app/model/class';
import { Ora } from 'src/app/model/ora';
import { Matter } from 'src/app/model/matter'
import { Teacher } from 'src/app/model/teacher';
import { HttpService } from 'src/service/http.service';
import { PreviewComponent } from './preview/preview.component';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-insert-data',
  templateUrl: './insert-data.component.html',
  styleUrls: ['./insert-data.component.scss']
})
export class InsertDataComponent implements OnInit, OnDestroy {

  teacher: Teacher[] = []
  ore: Ora[] = []
  prime: Classroom[] = []
  seconde: Classroom[] = []
  terze: Classroom[] = []
  subcription: Subscription;
  files: File[] = [];
  formTeacher: FormGroup
  flag: boolean = true
  previewFlag: boolean = false;


  @ViewChild(PreviewComponent) child!: PreviewComponent;

  human: Matter[] = []

  constructor(private http: HttpService) {
   }


  ngOnInit(): void {

  }



  factoryClass(param: string, year: string, setEmpty: Set<string>): Object{
    let _class: Classroom[] = []

    if(param.length > 1){
      let temp = param.split('-')
      temp.forEach(element => {
        element.replace('\r','')
        if(element != '' && element != '\r' && element.length ==1){setEmpty.add(element)}
      });

    }else{
      if(param != '' && param != '\r'){setEmpty.add(param)}
    }


    setEmpty.forEach(element => {
      let temp = new Classroom(year,element)
      _class.push(temp)
    });

    return {set: setEmpty, class: _class}
  }

  utilClassroom(elementP){}

  removeDuplicate(param: object[]): Teacher[]{
    let list: Teacher[] = []
    let temp: Teacher[] = []

    let classroom: Classroom[] = []
    param.forEach(elementP => {
      //console.log(elementP)
        if(elementP['prima']){
          if(elementP['prima'].length > 1 && elementP['prima'] != '\r'){
            let temp = elementP['prima'].split('-')
            temp.forEach(obj =>{
              if(obj.includes('\r')){
                obj = obj.replace('\r','')
              }
              classroom.push(new Classroom('PRIMA',obj))
           })
          }else if(elementP['prima'] != '\r'){
            classroom.push(new Classroom('PRIMA',elementP['prima']))
          }

        }
        if(elementP['seconda']){
          if(elementP['seconda'].length > 1 && elementP['seconda'] != '\r'){
            let temp = elementP['seconda'].split('-')
            temp.forEach(obj =>{
              if(obj.includes('\r')){
                obj = obj.replace('\r','')
              }
              classroom.push(new Classroom('SECONDA',obj))
           })
          }else if(elementP['seconda'] != '\r'){
            classroom.push(new Classroom('SECONDA',elementP['seconda']))
          }
        }
        if(elementP['terza']){
          if(elementP['terza'].length > 1 && elementP['terza'] != '\r'){
            let temp = elementP['terza'].split('-')
            temp.forEach((obj: string) =>{
              if(obj.includes('\r')){
                obj = obj.replace('\r','')
              }
              classroom.push(new Classroom('TERZA',obj))
           })
          }else if(elementP['terza'] != '\r'){
            classroom.push(new Classroom('TERZA',elementP['terza']))
          }
        }

        let matter: Matter[] = [];
          let temp_matter = new Matter(elementP['matter'][0])
          matter.push(temp_matter)
          elementP['matter'] = matter

        let teacher: Teacher = new Teacher('xxxx',Object.values(elementP)[0],elementP['matter'],classroom,Object.keys(elementP)[0]);
        list.push(teacher)
        classroom = [];
    });

    /**remove temp id */
    temp = list
    list = []
    temp.forEach(element => {
      let teacher = new Teacher(element.name, element.surname,element.matters,element.classroom)
      list.push(teacher)
    });
    //console.log(list)
    return list

  }





  onChange(input: any){
    let reader = new FileReader();
    this.files.push(...input.addedFiles);
    //console.log(input.addedFiles)
    let selectedFile: File[] = []
    input.addedFiles.forEach(element => {
      selectedFile.push(element)
    });

    //let selectedFile: File = input.addedFiles[0];

      reader.onload = (e) => {
        let readerList = [];
        let _teachers : object[] = []
        let _matter = new Set()
        let _prime :Classroom[] = [];
        let _seconde :Classroom[] = [];
        let _terze :Classroom[] = [];
        let setEmpty1: Set<string> = new Set()
        let setEmpty2: Set<string> = new Set()
        let setEmpty3: Set<string> = new Set()
        let text = reader.result.toString().split('\n');
        text.shift()
        text.forEach(element => {
          let obj = element.split('\t')
          if(obj[0]){
            let tempTeacher = {[obj[0]]:obj[1], matter:[obj[2]],prima:obj[3],seconda: obj[4], terza: obj[5]};
            _teachers.push(tempTeacher)
            _matter.add(obj[2])
          }
          //_prime = this.factoryClass(obj[3],Year.PRIMA, setEmpty1)['class']
          //_seconde = this.factoryClass(obj[4],Year.SECONDA, setEmpty2)['class']
          //_terze = this.factoryClass(obj[5],Year.TERZA, setEmpty3)['class']
        });
        console.log(this.teacher.length)
        if(this.teacher.length >= 1){
          console.log('xxx')
          this.removeDuplicate(_teachers).forEach(t =>{
            this.teacher.push(t)
          })
        }else{
          this.teacher = this.removeDuplicate(_teachers)
        }
        _teachers.forEach(element => {
          /* Object.values(element)[1].forEach(matter => {
            this.teacher.push(new Teacher('xxx',Object.values(element)[0],matter,Object.keys(element)[0]))
          }); */
        });

        this.prime = _prime
        this.seconde = _seconde
        this.terze = _terze

        text.forEach(element =>{
          let obj = element.split('\t')
          let ora: Ora;
          let classe: Classroom[] = [];


          if(obj[3] && obj[3].length > 0){

            _prime.forEach(element => {
              if(obj[3].includes(element.section)){
                classe.push(element)
              }
            });

            if(classe != undefined){
              classe.forEach(element => {
                ora = new Ora(obj[0],obj[2],element)

                if(ora){
                  this.ore.push(ora)
                }
              });
            }
            classe = []

          }
          if(obj[4] && obj[4].length > 0){

            _seconde.forEach(element => {
              if(obj[4].includes(element.section)){
                classe.push(element)
              }
            });

            if(classe != undefined){
              classe.forEach(element => {
                ora = new Ora(obj[0],obj[2],element)
                if(ora){
                  this.ore.push(ora)
                }
              });
            }
            classe = []

          }
          if(obj[5] && obj[5].length > 0){

            _terze.forEach(element => {
              if(obj[5].includes(element.section)){
                classe.push(element)
              }
            });

            if(classe != undefined){
              classe.forEach(element => {
                ora = new Ora(obj[0],obj[2],element)
                if(ora){
                  this.ore.push(ora)
                }
              });
            }
            classe = []

        }


        }
        )
        if(this.teacher.length > 0){this.flag = false}
        //console.log(this.prime)
        //console.log(this.seconde)
        //console.log(this.terze)
        console.log(this.teacher)
        //console.log(this.ore)
      }
      reader.readAsText(selectedFile[0]);

    }

  onSubmit(){
    console.log(this.formTeacher != undefined)
    if(this.formTeacher != undefined){
      this.formTeacher.removeControl('matterTemp')
      this.teacher.push(this.formTeacher.value)
    }


    /* this.formTeacher?.valueChanges.subscribe(form =>{
      this.teacher.push(form)
      console.log(form)
    }) */

    this.subcription = this.http.insertTeachs(this.teacher).subscribe(
      {
        next: this.handleInsertTeacher.bind(this),
        error: this.handleErrorInsertTeacher.bind(this)
      }
    )
  }

  handleContainer(){
    if(this.files.length > 1){

    }

  }

  handleForm(event: FormGroup){
    let form = event.value
    if(event.valid){
      this.formTeacher = event
    }
     (event.status == 'VALID')? this.flag = false : this.flag = true;
    /* let sub=event?.valueChanges.subscribe(form =>{
        if(event.status == 'VALID'){
          this.teacher.push(form)
        console.log(this.teacher)}
      }) */
    }

  handleReset(event: boolean){
    if(event){this.teacher = [];this.flag = true}
  }

  handleInsertTeacher(param){
    console.log(param)
    this.subcription.unsubscribe()

  }
  handleErrorInsertTeacher(error){
    console.log(error.error.message)
  }
  onSelect(event) {
    console.log(event);

  }

  onRemove(event) {
    this.child.removeAll()
    this.files.splice(this.files.indexOf(event), 1);
    this.teacher = [];
    this.flag = true;
  }


  ngOnDestroy(): void {
    this.subcription?.unsubscribe()
  }

  handleData(event){
    if(event.data.length > 0){
      this.teacher = event.data
    }else{
      this.files = []
    }



  }




}
