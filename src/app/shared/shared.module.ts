import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemTeacherComponent } from './item-teacher/item-teacher.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { MaterialModule } from '../material/material.module';
import { SnackbarComponent } from './snackbar/snackbar.component';



@NgModule({
  declarations: [
    ItemTeacherComponent,
    FooterComponent,
    ModalComponent,
    SnackbarComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    MatSidenavModule
  ],
  exports: [
    CommonModule,
    FooterComponent,
    MatSidenavModule,
    ItemTeacherComponent
  ]
})

export class SharedModule { }
