import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {TableService} from "../../services/table.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.scss']
})
export class CreateTableComponent implements OnInit {
  relationArray: FormArray;
  migrationArray: FormArray;
  types
  index
  form: FormGroup;

  constructor(public tableService:TableService,
              private route: Router) { }

  ngOnInit(): void {
    this.types = [
        "bigInteger",
        'bigIncrements',
        'binary',
        'boolean',
        'char',
        'dateTimeTz',
        'dateTime',
        'date',
        'decimal',
        'double',
        'enum',
        'float',
        'foreignId',
        'foreignIdFor',
        'foreignUlid',
        'foreignUuid',
        'geometryCollection',
        'geometry',
        'id',
        'increments',
        'integer',
        'ipAddress',
        'json',
        'jsonb',
        'lineString',
        'longText',
        'macAddress',
        'mediumIncrements',
        'mediumInteger',
        'mediumText',
        'morphs',
        'multiLineString',
        'multiPoint',
        'multiPolygon',
        'nullableMorphs',
        'nullableTimestamps',
        'nullableUuidMorphs',
        'point',
        'polygon',
        'rememberToken',
        'set',
        'smallIncrements',
        'smallInteger',
        'softDeletesTz',
        'softDeletes',
        'string',
        'text',
        'timeTz',
        'time',
        'timestampTz',
        'timestamp',
        'timestampsTz',
        'timestamps',
        'tinyIncrements',
        'tinyInteger',
        'tinyText',
        'unsignedBigInteger',
        'unsignedDecimal',
        'unsignedInteger',
        'unsignedMediumInteger',
        'unsignedSmallInteger',
        'unsignedTinyInteger',
        'uuidMorphs',
        'ulid',
        'uuid',
        'year'
    ]
    this.index = [
      " ",
      "INDEX",
      "UNIQUE",
      "PRIMARY"
    ]
    this.form = new FormGroup({
      table_name: new FormControl('',[Validators.required]),
      columns: new FormArray([]),
      relations: new FormArray([])
    })
  }

  get migrations() {
    return this.form.get('columns') as FormArray
  }
  addMigrationInput() {
    this.migrationArray = this.form.get('columns') as FormArray;
    this.migrationArray.push(this.GenMigrationsRow())
  }
  deleteMigrationInput(m:any) {
    this.migrationArray = this.form.get('columns') as FormArray;
    this.migrationArray.removeAt(m)
  }

  get relations() {
    return this.form.get('relations') as FormArray;
  }
  addRelations() {
    this.relationArray = this.form.get('relations') as FormArray;
    this.relationArray.push(this.GenRelationsRow())
  }
  deleteRelation(r:any) {
    this.relationArray = this.form.get('relations') as FormArray;
    this.relationArray.removeAt(r)
  }

  GenRelationsRow(): FormGroup {
    return new FormGroup({
      foreignColumn:new FormControl('',[Validators.required]),
      referenceTable:new FormControl('',[Validators.required]),
      referenceColumn:new FormControl('',[Validators.required]),
    });
  }
  GenMigrationsRow(): FormGroup{
    return new FormGroup({
      column_name: new FormControl('', [Validators.required]),
      type: new FormControl('',[Validators.required]),
      length: new FormControl(''),
      increment: new FormControl(''),
      nullable: new FormControl(''),
      indexes: new FormControl(''),
      default: new FormControl(''),
    })
  }

  onSubmit() {
    this.tableService.createTable(this.form.value)
    this.tableService.getAllTables()
    this.route.navigate(['/']).then(r => r)
  }

  getColumns(i) {
    return this.form.get('relations')?.value[i].referenceTable.columns ?? [];
  }
}
