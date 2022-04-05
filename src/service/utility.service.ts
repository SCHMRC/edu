import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  credential: BehaviorSubject<string> = new BehaviorSubject(null)

  constructor() { }
}
