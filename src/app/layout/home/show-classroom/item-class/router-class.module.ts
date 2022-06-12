import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import {ReactiveFormsModule} from '@angular/forms'




@NgModule({
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class RouterClassModule { }
