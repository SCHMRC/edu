import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { ClassRoutingModule, COMPONENTS } from './class-routing.module'
import {ReactiveFormsModule} from '@angular/forms'




@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    ClassRoutingModule
  ]
})
export class RouterClassModule { }
