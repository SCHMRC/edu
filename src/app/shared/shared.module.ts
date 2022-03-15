import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemTeacherComponent } from './item-teacher/item-teacher.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    ItemTeacherComponent,
    FooterComponent
  ],
  imports: [
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
