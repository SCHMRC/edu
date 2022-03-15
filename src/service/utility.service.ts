import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  flag: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor() { }
}
