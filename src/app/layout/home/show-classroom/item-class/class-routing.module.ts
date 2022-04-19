import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from 'src/app/layout/error/error.component';
import { HandleClassTeacherComponent } from './handle-class-teacher/handle-class-teacher.component';
import { ItemClassComponent } from './item-class.component';
import { StudentComponentComponent } from './student-component/student-component.component';




const routes: Routes = [
  {path: '', component: ItemClassComponent, children: [
    {path: '', redirectTo: 'handle-teacher', pathMatch: 'full'},
    {path: 'handle-teacher', component: HandleClassTeacherComponent},
    {path: 'handle-student', component: StudentComponentComponent},
    { path: '**', component:  ErrorComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }

export const COMPONENTS = [
  HandleClassTeacherComponent,
  StudentComponentComponent


]
