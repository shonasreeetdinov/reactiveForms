import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  // api = "http://192.168.5.104:8000/api/migration/"
  api = "http://localhost:8000/tables/"
  tables
  selectedTable
  selectedColumns;
  selectedRelations;

  constructor(private http: HttpClient) { }

  getAllTables() {
    this.http.get(this.api).subscribe((res) => {
      this.tables = res
    })
  }

  createTable(table) {
      this.http.post(this.api, table).subscribe(res=> {})
  }

  updateTable(table) {
    return this.http.put(this.api + this.selectedTable.id, table).subscribe((res) =>{})
  }

  deleteTable(id) {
    this.http.delete(this.api + id).subscribe(res => {})
  }

}
