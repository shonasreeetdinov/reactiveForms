import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-see-table',
  templateUrl: './see-table.component.html',
  styleUrls: ['./see-table.component.scss']
})
export class SeeTableComponent implements OnInit {

  modal:boolean = false;
  table

  constructor() { }

  ngOnInit(): void {}

  openModal(table) {
    this.modal = !this.modal
    this.table = table
  }

}

export class UpdateTableComponent {
}
