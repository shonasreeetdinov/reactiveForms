import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {TableService} from "../../services/table.service";
import {Route, Router} from "@angular/router";

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
  columns: any;

  constructor(public tableService:TableService,
              public route: Router) { }

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
      "null",
      "index",
      "unique",
      "primary"
    ]
    this.form = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(32)]),
      columns: new FormArray([], [Validators.required]),
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
      foreignColumn:new FormControl('',[Validators.required, Validators.minLength(2),Validators.maxLength(32)]),
      referenceTable:new FormControl('',[Validators.required]),
      referenceColumn:new FormControl('',[Validators.required]),
      onUpdate:new FormControl(''),
      onDelete:new FormControl(''),
    });
  }
  GenMigrationsRow(): FormGroup{
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(32)]),
      type: new FormControl('',[Validators.required]),
      length: new FormControl('',[Validators.required, Validators.maxLength(255)]),
      nullable: new FormControl(false,[Validators.required]),
      index: new FormControl('',[Validators.required]),
      default: new FormControl('',[Validators.minLength(2), Validators.maxLength(32)]),
    })
  }

  onSubmit() {
    this.tableService.createTable(this.form.value)
    this.route.navigate(['/']).then(r => r)
    this.tableService.getAllTables()
  }

  getColumns(i) {
    this.tableService.tables.forEach((v) => {
      if(v.id === this.form.get('relations')?.value[i]?.referenceTable) {
        this.columns = v.columns
      }
    })
    return this.columns
  }
}
