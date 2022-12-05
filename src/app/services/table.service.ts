import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  api = "http://192.168.5.103:8090/"
  apiTables = "http://192.168.5.103:8090/api/tables"
  apiCreate = "http://192.168.5.103:8090/api/migration"
  apiUpdate = "http://192.168.5.103:8090/api/edit"
  apiDelete = "http://192.168.5.103:8090/api/delete/"

  fakeApi = "http://localhost:8000/tables"

  tables: {id:number,name:string,columns:[],relations:[]}[] = []
  selectedTable
  selectedColumns;
  selectedRelations;

  constructor(private http: HttpClient) { }

  getAllTables() {
    return this.http.get(this.apiTables).pipe(
      map((res: {data: any[]}) => {
        this.tables = res.data
      })
    )
  }

  createTable(table) {
    this.http.post(this.apiCreate, table).subscribe(res=> {})
  }

  updateTable(table) {
    return this.http.post(this.apiUpdate, table).subscribe((res) =>{})
  }

  deleteTable(id) {
    // @ts-ignore
    this.http.post(this.apiDelete + id).subscribe(res => {})
  }

  // getAllTables() {
  //   this.http.get(this.fakeApi).subscribe((res) => {
  //     this.tables = res
  //   })
  // }
  //
  // createTable(table) {
  //   this.http.post(this.fakeApi, table).subscribe(res=> {})
  // }
  //
  // updateTable(table) {
  //   return this.http.put(this.fakeApi, table).subscribe((res) =>{})
  // }
  //
  // deleteTable(id) {
  //   this.http.delete(this.apiDelete + id).subscribe(res => {})
  // }
}
