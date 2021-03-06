import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InsertDataComponent } from './insert-data/insert-data.component';
import { ItemsComponent } from './show-items/items/items.component';
import { ShowItemsComponent } from './show-items/show-items.component';
import { ShowClassroomComponent } from './show-classroom/show-classroom.component';
import { AuthenticationGuard } from 'src/app/authentication/authentication.guard';
import { TimeTableComponent } from './time-table/time-table.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent, children: [
    {path:'',redirectTo:'insert',pathMatch: 'full'},
    {path:'insert',component: InsertDataComponent, canActivate: [AuthenticationGuard]},
    {path:'show-items', component: ShowItemsComponent, canActivate: [AuthenticationGuard]},
    {path:'show-items/:id',component: ItemsComponent, canActivate: [AuthenticationGuard]},
    {path:'show-class',component: ShowClassroomComponent, canActivate: [AuthenticationGuard]},
    {path:'show-time-table', component: TimeTableComponent, canActivate: [AuthenticationGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

export const COMPONENTS = [
  InsertDataComponent,
  ShowItemsComponent,
  ItemsComponent,
  ShowClassroomComponent

]
