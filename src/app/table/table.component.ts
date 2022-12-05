import {Component, OnInit, ViewChild} from '@angular/core';
import {TableService} from "../services/table.service";
import {SeeTableComponent} from "../forms/see-table/see-table.component";
import {Router} from "@angular/router";
import {UpdateTableComponent} from "../forms/update-table/update-table.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild(SeeTableComponent) seeTableComponent: SeeTableComponent;
  @ViewChild(UpdateTableComponent) updateTableComponent: UpdateTableComponent;
  deleteDisplay: boolean = false;

  constructor(public tableService: TableService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllTables()
  }

  getAllTables() {
    this.tableService.getAllTables().subscribe((res) => {})
  }

  deleteTable() {
    this.tableService.tables.forEach((v:any,i:any) => {
      if(this.tableService.selectedTable.id === v.id) {
        this.tableService.tables.splice(i, 1)
      }
    })
    this.tableService.deleteTable(this.tableService.selectedTable.id)
    this.deleteDisplay = false
  }

  showDialog(table) {
    if(table) {
      this.seeTableComponent.openModal(table)
    }
  }

  redirect(table: any) {
    if(table) {
      this.tableService.selectedTable = table
      this.tableService.selectedColumns = table.columns
      this.tableService.selectedRelations = table.relations
      this.router.navigate(["/update/" + table.id])
    }
  }

  deleteModal(table: any) {
    this.tableService.selectedTable = table
    this.deleteDisplay = true
  }
}
