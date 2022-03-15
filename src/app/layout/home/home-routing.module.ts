import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InsertDataComponent } from './insert-data/insert-data.component';
import { ItemsComponent } from './show-items/items/items.component';
import { ShowItemsComponent } from './show-items/show-items.component';
import { ShowClassroomComponent } from './show-classroom/show-classroom.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent, children: [
    {path:'',redirectTo:'insert',pathMatch: 'full'},
    {path:'insert',component: InsertDataComponent},
    {path:'show-items', component: ShowItemsComponent},
    {path:'show-items/:id',component: ItemsComponent},
    {path:'show-class',component: ShowClassroomComponent}
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
