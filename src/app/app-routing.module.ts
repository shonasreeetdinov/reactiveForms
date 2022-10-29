import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateTableComponent} from "./forms/create-table/create-table.component";
import {UpdateTableComponent} from "./forms/update-table/update-table.component";
import {TableComponent} from "./table/table.component";

const routes: Routes = [
  {path: '', component: TableComponent},
  {path: 'create', component: CreateTableComponent},
  {path: 'update/:id', component: UpdateTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
