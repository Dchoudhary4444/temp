import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Data } from '../entity/Data';
@Component({
  selector: 'app-add-row',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.scss']
})
export class AddRowComponent implements OnInit {

  newRowData: any = null;
  schemaList: Array<string> = ['abc', 'def', 'ghi', 'jkl', 'mno'];
  rowAdded = false;
  showModal: boolean = false;
  // rowData :FormGroup;

  constructor(
    private http: HttpClient,
    private fb:FormBuilder
  ) {
  }


  ngOnInit(): void {
    // this.rowData = this.fb.group({
    //   priorityTable: ['', Validators.required],
      // citiApplicationName: ['', Validators.required],
      // dbInstanceName: ['', Validators.required],
      // dbSchemaName: ['', Validators.required],
      // tableName: ['', Validators.required],
      // columnName: ['', Validators.required],
      // columnDataType: ['', Validators.required],
      // attributeInDataLake: ['', Validators.required],
      // targetTableName: ['', Validators.required],
      // targetColumnName: ['', Validators.required],
      // isStatic: ['', Validators.required],
      // staticValue: ['', Validators.required],
    // });

  }


  addRow() {
    this.newRowData = new Data;
    this.rowAdded = !this.rowAdded;
    console.log(this.newRowData);

  }
  onSubmitClick() {
    console.log("on submit", this.newRowData);
    this.showModal = true;
  }
  onResetClick() {
  }

  onCrossClick() {
    this.rowAdded = !this.rowAdded;
    this.newRowData = null;
  }
  cancelModal() {
    this.showModal = false;
  }
}
