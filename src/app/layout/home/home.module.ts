import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { InsertDataComponent } from './insert-data/insert-data.component';
import { HomeRoutingModule, COMPONENTS} from './home-routing.module';
import { ShowItemsComponent } from './show-items/show-items.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MaterialModule } from './../../material/material.module';
import { SharedModule } from './../../shared/shared.module';
import { PreviewComponent } from './insert-data/preview/preview.component';
import { FormTeacherComponent } from './insert-data/form-teacher/form-teacher.component';
import { FormStudentComponent } from './insert-student/form-student/form-student.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { ChipsComponent } from './show-items/component/chips/chips.component';
import { ItemClassComponent } from './show-classroom/item-class/item-class.component';




@NgModule({
  declarations: [
    ...COMPONENTS,
    PreviewComponent,
    FormTeacherComponent,
    FormStudentComponent,
    TimeTableComponent,
    ChipsComponent,
    ItemClassComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDropzoneModule,
    HomeRoutingModule,
  ],
  exports: [
    HomeRoutingModule,
    InsertDataComponent,
    ShowItemsComponent
  ]
})
export class HomeModule { }
