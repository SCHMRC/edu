import { LABEL_MATTER } from 'src/assets/label/label_matter';
import {Teacher} from './teacher'

export class Matter{
  id?: number;
  matter: string;
  teachers?: Teacher[];


  constructor(_matter: string, _teachers?: Teacher[],_id?:number){
    this.matter = _matter;
    if(_teachers){this.teachers = _teachers}
    if(_id){this.id = _id}

  }
}
