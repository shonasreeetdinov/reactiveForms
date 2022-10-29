import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import { CreateTableComponent } from './forms/create-table/create-table.component';
import { UpdateTableComponent } from './forms/update-table/update-table.component';
import {SidebarModule} from "primeng/sidebar";
import {TableService} from "./services/table.service";
import { TableComponent } from './table/table.component';
import {InputTextModule} from "primeng/inputtext";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {InputNumberModule} from "primeng/inputnumber";
import {CheckboxModule} from "primeng/checkbox";
import { SeeTableComponent } from './forms/see-table/see-table.component';
import {DialogModule} from "primeng/dialog";

@NgModule({
  declarations: [
    AppComponent,
    CreateTableComponent,
    UpdateTableComponent,
    TableComponent,
    SeeTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    SidebarModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    DialogModule
  ],
  providers: [
    TableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
