import { LABEL_MATTER } from 'src/assets/label/label_matter';
import {Teacher} from './teacher'

export class Matter{
  id?: number;
  matter: string;
  teachers?: Set<Teacher>;


  constructor(_matter: string, _teachers?: Set<Teacher>,_id?:number){
    this.matter = _matter;
    if(_teachers){this.teachers = _teachers}
    if(_id){this.id = _id}

  }
}
