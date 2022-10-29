import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TableService} from "../../services/table.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-table',
  templateUrl: './update-table.component.html',
  styleUrls: ['./update-table.component.scss']
})
export class UpdateTableComponent implements OnInit {

  relationArray: FormArray;
  migrationArray: FormArray;
  types
  index
  form: FormGroup;
  columns: any[] = [];

  constructor(public tableService:TableService,
              private route: Router,
              private fb: FormBuilder) { }

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
      table_name: new FormControl(this.tableService.selectedTable?.table_name,[Validators.required]),
      columns: new FormArray([]),
      relations: new FormArray([])
    })
    this.patchMigration()
    this.patchRelation()
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
      name: new FormControl('', [Validators.required]),
      type: new FormControl('',[Validators.required]),
      length: new FormControl(''),
      increment: new FormControl(''),
      nullable: new FormControl(''),
      index: new FormControl(''),
      default: new FormControl(''),
    })
  }

  getColumns(i) {
    return this.form.get('relations')?.value[i].referenceTable.columns ?? [];
  }

  patchMigration() {
    const control = <FormArray>this.form.get('columns')
    this.tableService.selectedColumns.forEach(x => {
      control.push(this.patchMigrationValue(x))
    })
  }
  patchMigrationValue(c) {
    return this.fb.group({
      column_name: c.column_name,
      type: c.type,
      length: c.length,
      increment: c.increment,
      index: c.index,
      nullable: c.nullable,
      default: c.default
    })
  }

  patchRelation() {
    const control = <FormArray>this.form.get('relations')
    this.tableService.selectedRelations.forEach(x => {
      control.push(this.patchRelationValue(x))
    })
  }
  patchRelationValue(r) {
    return  this.fb.group({
      foreignColumn: r.foreignColumn,
      referenceTable: r.referenceTable,
      referenceColumn: r.referenceColumn
    })
  }

  onUpdate() {
    this.tableService.updateTable(this.form.value)
    this.tableService.getAllTables()
    this.route.navigate(['/']).then(r => r)
  }
}
