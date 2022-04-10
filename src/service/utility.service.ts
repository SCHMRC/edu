import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Teacher } from 'src/app/model';
import { User } from 'src/app/model/user';
import * as SNACKBAR from 'src/assets/config/snackBar.config'

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  credential: BehaviorSubject<string> = new BehaviorSubject(null)
  showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false)
  teacher$: BehaviorSubject<Teacher> = new BehaviorSubject(null)


  constructor() { }


}
