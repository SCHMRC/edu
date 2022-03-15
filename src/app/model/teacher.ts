import { Classroom } from './class';
import { Matter } from './matter'

export class Teacher {
  id?: string;
  name: string;
  surname: string;
  matters: Matter[];
  classroom: Classroom[];

  constructor(_name: string,_surname: string,_matter: Matter[],_class: Classroom[],_id?: string){
    this.name = _name
    this.surname = _surname
    this.matters = _matter
    this.classroom = _class
    if(_id){this.id = _id}
  }
}
