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
  disabledColumns:any[] = []
  constructor(public tableService:TableService,
              private route: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    if(!this.tableService.selectedTable) {
      this.route.navigate(['/'])
    }
    this.tableService.tables.forEach((v) => {
      if(this.tableService.selectedTable?.id !== v.id) {this.disabledColumns.push(v)}
    })
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
      id: new FormControl(this.tableService.selectedTable?.id),
      name: new FormControl(this.tableService.selectedTable?.name,[Validators.required, Validators.minLength(2),Validators.maxLength(32)]),
      columns: new FormArray([], [Validators.required]),
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
      id: new FormControl(0),
      foreignColumn:new FormControl('',[Validators.required, Validators.maxLength(64)]),
      referenceTable:new FormControl(1,[Validators.required]),
      referenceColumn:new FormControl(1,[Validators.required]),
      onUpdate:new FormControl(false),
      onDelete:new FormControl(false),
    });
  }
  GenMigrationsRow(): FormGroup{
    return new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(32)]),
      type: new FormControl('',[Validators.required]),
      length: new FormControl('', [Validators.maxLength(255)]),
      nullable: new FormControl(false),
      index: new FormControl('null'),
      default: new FormControl('',[Validators.minLength(2), Validators.maxLength(32)]),
    })
  }

  getColumns(i) {
    this.tableService.tables.forEach((v) => {
      if(v.id === this.form.get('relations')?.value[i].referenceTable) {
        this.columns = v.columns
      }
    })
    return this.columns
  }

  patchMigration() {
    const control = <FormArray>this.form.get('columns')
    this.tableService?.selectedColumns?.forEach(x => {
      control.push(this.patchMigrationValue(x))
    })
  }
  patchMigrationValue(c) {
    if(c.nullable === 1) {
       c.nullable = true
    }
    return this.fb.group({
      id: c?.id,
      name: c.name,
      type: c.type,
      length: c.length,
      index: c.index,
      nullable: c.nullable,
      default: c.default
    })
  }

  patchRelation() {
    const control = <FormArray>this.form.get('relations')
    this.tableService.selectedRelations?.forEach(x => {
      control.push(this.patchRelationValue(x))
    })
  }
  patchRelationValue(r) {
    let t
    this.tableService.tables.forEach((v) => {
      if(v.id === r.referenceTable) {
        t = v
        this.columns = t.columns
      }
    })
    if(r.onDelete === 1 ) {r.onDelete = true}
    if(r.onUpdate === 1 ) {r.onUpdate = true}
    return this.fb.group({
      id: r.id,
      foreignColumn: r.foreignColumn,
      referenceTable: t?.id,
      referenceColumn: r.referenceColumn,
      onDelete: r.onDelete,
      onUpdate: r.onUpdate
    })
  }

  onUpdate() {
    // console.log(this.form.value)
    this.tableService.updateTable(this.form.value)
    this.tableService.getAllTables()
    this.route.navigate(['/']).then(r => r)
  }

}
