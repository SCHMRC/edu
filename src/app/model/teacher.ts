import { Classroom } from './class';
import { Matter } from './matter'

export class Teacher {
  id?: string;
  name: string;
  surname: string;
  email: string;
  edumail: string;
  phone: string;
  adress: string;
  matters: Matter[];
  classroom: Classroom[];

  constructor(
    _name: string,
    _surname: string,
    _matter: Matter[],
    _class?: Classroom[],
    _email?: string,
    _edumail?: string,
    _phone?: string,
    _adress?: string,
    _id?: string)
    {
      this.name = _name
      this.surname = _surname
      this.matters = _matter
      if(_class){this.classroom = _class}
      if(_id){this.id = _id}
      if(_email){this.email = _email}
      if(_edumail){this.edumail = _edumail}
      if(_phone){this.phone = _phone}
      if(_adress){this.adress = _adress}
    }
}
