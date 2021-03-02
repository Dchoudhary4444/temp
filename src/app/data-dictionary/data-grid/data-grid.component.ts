import { KeyValue } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { DdServicesService } from '../services/dd-services.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-data-grid',
  queries: {
    filterDiv: new ViewChild("filterDiv"),
    tableDiv: new ViewChild("tableData"),
  },
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {
  tableHeader = {}
  // tableHeader: string[] = [];
  dbColumnNames: any[] = [];
  editableColumns: any[] = [];
  public tableData: any[] = [];
  public buttonName: any = 'Show';
  public tableDataTemp: any = [];
  public show: any = 'none';

  public filterDiv!: ElementRef;
  public tableDiv!: ElementRef;

  application: any = [];
  instance: any = [];
  schema: any = [];
  table: any = [];

  allData: any = [];
  filteredData: any = [];

  currentFilterdData: any = [];
  previousFilteredData: any = [];

  searchBy: string = '';
  allSelected: boolean = true;
  filterByPrevious: string = "";
  filterDataList: any = [];

  filterBy: string = '';
  previousFilterBy: string = '';

  //for filter division postion
  x: any;
  y: any;

  // tempList: any = [];
  // flag: boolean = false;
  sortDirection: string = "";
  propName: string = "";
  propDataType: string = "";


  tempList: any = [];
  flag: boolean = false;


  editable: boolean = false;
  showSize: any = 'none';
  showModal: boolean = false;
  enableEditIndex = null;
  editField: any;
  flag1: boolean = false;
  maxId : any;

  modalTableData: any = [];
  changedData: any = [];
  dataTypeList: any = [];
  dataTypeForm!: FormGroup;

  tabArray: string[] = [];
  slicedTableHeader: any[] = []

  schemaDesignArray: string[] = []
  analysisDesignArray: string[] = []
  modelingDesignArray: string[] = []
  cur_tab: string = "Schema Details"
  colArray: string[] = [];
  constructor(
    private http: HttpClient,
    private targetElement: ElementRef,
    private ddService: DdServicesService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    console.log("load data chala 11111111111111111")
    this.dbColumnNames = [
      {
        name: 'id',
        displayHeader: "Id",
        editable: false,
        type: 'number',
        isFilterable:false

      },
      {
        name: "citiApplicationName",
        displayHeader: "Citi Appl Name",
        editable: false,
        type: 'text',
        filterList:[],
        isFiltered:false,
        isFilterable:true

      },
      {
        name: 'dbInstanceName',
        displayHeader: "Database Instance Name",
        editable: false,
        type: 'text',
        filterList:[],
        isFiltered:false,
        isFilterable:true
      },
      {
        name: 'dbSchemaName',
        displayHeader: "Database Schema Name",
        editable: false,
        type: 'text',
        filterList:[],
        isFiltered:false,
        isFilterable:true
      },
      {
        name: 'tabelName',
        displayHeader: "Table Name",
        editable: false,
        type: 'text',
        filterList:[],
        isFiltered:false,
        isFilterable:true
      },
      {
        name: 'columnName',
        displayHeader: "Column Name",
        editable: false,
        type: 'text',
        filterList:[],
        isFiltered:false,
        isFilterable:true
      },
      {
        name: 'dataType',
        displayHeader: "Data Type",
        editable: true,
        type: 'multiple',
        filterList:[],
        isFiltered:false,
        isFilterable:true
      },
      {
        name: 'columnDescription',
        displayHeader: "Column Description",
        editable: true,
        type: 'text',
        filterList:[],
        isFiltered:false,
        isFilterable:true
      },
      {
        name: 'minCharactersLength',
        displayHeader: "Minimum Character Length",
        editable: true,
        type: 'number',
        filterList:[],
        isFiltered:false,
        isFilterable:true
      },
      {
        name: 'priorityTable',
        displayHeader: "Priority Table",
        editable: false,
        type: 'text',
        filterList:[],
        isFiltered:false,
        isFilterable:true
      },
      {
        name: 'positionalOrderNo',
        displayHeader: "Positional Order No",
        editable: false,
        type: 'number',
        filterList:[],
        isFiltered:false,
        isFilterable:true
        
      },
      {
        name: 'attributeInDataLake',
        displayHeader: "Attribute in Data Lake",
        editable: false,
        type: 'text',
        filterList:[],
        isFiltered:false,
        isFilterable:true
      },
      {
        name: 'targetTableName',
        displayHeader: "Target Table Name",
        editable: false,
        type: 'text',
        filterList:[],
        isFiltered:false,
        isFilterable:true
      },
      {
        name: 'targetColumnName',
        displayHeader: "Target Column Name",
        editable: false,
        type: 'text',
        filterList:[],
        isFiltered:false,
        isFilterable:true
      },
      {
        name: 'isStatic',
        displayHeader: "Is Field Static",
        editable: false,
        type: 'text',
        filterList:[],
        isFiltered:false,
        isFilterable:true
      },
      {
        name: 'staticValue',
        displayHeader: "Static Value",
        editable: false,
        type: 'text',
        filterList:[],
        isFiltered:false,
        isFilterable:true
      },
    ];
   this.tabArray = ["Schema Details", "Analysis Details", "Modeling Details"];
    this.schemaDesignArray = ["id","citiApplicationName", "dbInstanceName", "dbSchemaName", "columnName","columnDescription","minCharactersLength"]
    this.analysisDesignArray = ["id","dbSchemaName", "tabelName", "dataType","targetColumnName"]
    this.modelingDesignArray = ["id","tabelName", "dataType", "columnName"]

    this.onTabClick("Schema Details", "")
    this.tableHeader =
    {
      action: "Action",
      id: "ID",
      citiApplicationName: "CTI Appl Name",
      dbInstanceName: "Database Instance Name",
      dbSchemaName: "Database Schema Name",
      tabelName: "Table Name",
      columnName: "Column Name",
      dataType: "Data Type",
      columnDescription: "Column Description",
      minCharactersLength: "Min Char Length",
      priorityTable: "Priority Table",
      positionalOrderNo: "Positional Order No",
      attributeInDataLake: "Attribute In Data Lake",
      targetTableName: "Target Table Name",
      targetColumnName: "Target Column Name",
      isStatic: "Is Field Static",
      staticValue: "Static Value"
    };



    this.dataTypeForm = new FormGroup({
      dataTypeControl: new FormControl(''),
      dataTypeSizeControl: new FormControl(''),
    });
    this.dataTypeList = [
      { name: 'char', size: true },
      { name: 'varchar', size: true },
      { name: 'text', size: true },
      { name: 'binary', size: true },
      { name: 'longtext', size: false },
      { name: 'int', size: false },
      { name: 'bigint', size: false },
      { name: 'real', size: false },
      { name: 'datetime', size: false },
    ];

    //   this.allData = this.tableData;
    //   this.filteredData = this.tableData;
    //   this.performFilter(this.tableData, "");
    //   this.previousFilteredData = Object.assign([], this.allData);
    // }
    // )

    this.ddService.statusUpdate.subscribe((data: any) => {
      console.log("djkcn", data.length)
      this.tableData = data;
      console.log("1", this.tableData);
      this.filteredData = this.tableData;
      console.log("2", this.filteredData);
      this.allData = this.tableData;
      console.log("data service s aaya************88")
      this.performFilter(this.tableData, '');
      
    });
  }


  //To retain the order of the dictionary
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }
  setSortParams(dir: any, col: any, type: any) {
    console.log("dir", dir, col, typeof (type));
    this.sortDirection = dir;
    this.propName = col;
    this.propDataType = typeof (type);
  }
  //Export Function
  export() {
    console.log("export clicked");
    this.http.get("http://localhost:9091/dgui/downloadZip", { responseType: "arraybuffer" }).subscribe(res => {
      this.downloadFile(res);
    })
  }

  downloadFile(data: any) {
    const contentType = 'application/zip';
    const blob = new Blob([data], { type: contentType });

    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = "data";
    link.click();
  }

  eventHandler(event: any) {
    console.log('event handler chala');
    console.log(event);
    this.tableData = event;
  }
  onTabClick(tab: string, event: any) {

    this.slicedTableHeader = []
    this.cur_tab = tab

    if (tab === "Schema Details") {
      console.log(tab + " Selected")
      this.schemaDesignArray.forEach(element => {
        let temp: any = {}
        temp = this.dbColumnNames.find(x =>
          element == x.name
        );
        this.slicedTableHeader.push(temp)
      });
      this.colArray = this.schemaDesignArray
    }

    if (tab === "Analysis Details") {

      console.log(tab + " Selected")

      this.analysisDesignArray.forEach(element => {
        let temp: any = {}
        temp = this.dbColumnNames.find(x =>
          element == x.name
        );
        this.slicedTableHeader.push(temp)
      });
      this.colArray = this.analysisDesignArray

    }
    if (tab === "Modeling Details") {

      console.log(tab + " Selected")


      this.modelingDesignArray.forEach(element => {
        let temp: any = {}
        temp = this.dbColumnNames.find(x =>
          element == x.name
        );
        this.slicedTableHeader.push(temp)
      });

      this.colArray = this.modelingDesignArray

    }

  }
  deleteRow(item: any) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    const body = JSON.stringify(item);
    console.log(body)
    this.http.post("http://localhost:4200/assets/deletedData.json", item).subscribe(res => {
      console.log(res);
    });
    this.http.get('assets/deletedData.json').subscribe((data) => {
      console.log(data);
      // this.tableData = JSON.parse(JSON.stringify(data));
      // console.log(this.tableData);
    });
  }
   //Enable Editing
   enableEdit(item: any, i: any) {
    this.modalTableData = [];
    this.changedData = [];
    this.flag1 = false;
    this.editable = true;
    this.enableEditIndex = i;
    //for dividing data type and size
    var regexStr = item.dataType.match(/[a-z]+|[^a-z]+/gi);
    if (regexStr.length > 1) {
      this.showSize = 'inline-block';
      var len = regexStr[1].length - 1;
      this.dataTypeForm.patchValue({
        dataTypeSizeControl: regexStr[1].substring(1, len),
      });

    } else {
      this.showSize = 'none';
    }
    console.log(regexStr[0]);

    this.dataTypeForm.patchValue({ dataTypeControl: regexStr[0]});

    this.ddService.getMaxId().subscribe(data => {
      console.log(typeof(data));
      this.maxId = data;
    })
  }
  //return if size is applicable to data_type
  isSizePresent(dataTypeSelector: any): boolean {
    var isSizePresent = this.dataTypeList.some(function (element: any) {
      if (element.name === dataTypeSelector) {
        return element.size;
      }
    });
    return isSizePresent;
  }

  //called when data type is changed
  onDataTypeOptionsSelected(dataTypeSelector: any) {
    if (this.isSizePresent(dataTypeSelector)) {
      this.showSize = 'inline-block';
    } else {
      this.showSize = 'none';
      this.dataTypeForm.patchValue({ dataTypeSizeControl: null });
    }
  }
  cancel() {
    this.editable = false;
    this.modalTableData = [];
    this.changedData = [];
    this.flag1 = false;
  }

 
  changeinput(colName: any, val: any, item: any) {

    console.log(colName, val.target.value,item[colName]);
    
    if (item[colName] != val.target.value) { 
      this.changedData = this.changedData.filter(function(element: any,index: any,self:any[]){
        return element.name !== colName;
      });
      this.changedData.push({
        name: colName,
        oldValue: item[colName],
        newValue: val.target.value,
       });
      this.flag1 = true;
    }
    else{
      this.changedData = this.changedData.filter(function(element: any,index: any,self:any[]){
       return element.name !== colName;
      });
      } 
    }
    
  showUpdateModal(item: any) {

    this.showModal = true;
    this.modalTableData = [];
    this.modalTableData = this.changedData;
   
    

    if (this.isSizePresent(this.dataTypeForm.get('dataTypeControl')?.value)) {
      var newDataType: any;
      newDataType =
        this.dataTypeForm.get('dataTypeControl')?.value +
        '(' +
        this.dataTypeForm.get('dataTypeSizeControl')?.value +
        ')';
    } else {
      newDataType = this.dataTypeForm.get('dataTypeControl')?.value
    }
    if (newDataType !== item.dataType) {
      this.modalTableData.push({
        name: 'dataType',
        oldValue: item.dataType,
        newValue: newDataType,
      });
      this.flag1 = true;
    }
    
    
    if (this.flag1 && this.modalTableData[0].name!=='id') {
      this.modalTableData.splice(0, 0, {
        name: 'id',
        oldValue: item.id,
        newValue: this.maxId+1
      });
    }

  }
  cancelModal() {
    this.showModal = false;
  }

  //update row
  deepCopyRow(o : any) : any {
    return JSON.parse(JSON.stringify(o));
  }

  updateRow(item: any){
    var oldEditableRow = this.tableData.filter(function(element: any,index: any,self:any[]){
      return element.id == item[0].oldValue;
    });
    console.log("before cmp",oldEditableRow);

    var newEditedRow = this.deepCopyRow(oldEditableRow);
    for(let i=0; i<this.dbColumnNames.length; i++)
    {
      for(let j=0;j<item.length;j++){
        if(this.dbColumnNames[i].name == item[j].name){
          console.log(item[j].name);
          newEditedRow[0][item[j].name]=item[j].newValue;
          
        }
      }

    }
   
    this.ddService.editRow(JSON.parse(JSON.stringify(newEditedRow)),oldEditableRow[0]['id']);
      this.showModal = false;
      this.editable = false; 
    
  }
  //newly added function
  onFilterFocusLost() {
    this.show = "none"
  }

  onFilterClick(event: any, filterBy: string) {
    this.filterBy = filterBy;
    console.log(filterBy)

    if (this.filterByPrevious.length == 0) {
      this.filterByPrevious = this.filterBy;
      this.show = "block";
    }
    else {
      if (this.filterByPrevious === this.filterBy) {
        this.show = "block";
        this.filterByPrevious = "";
      }
      else {
        this.filterByPrevious = this.filterBy;
        this.show = "block";
      }
    }//else ends here


    // if (this.show == "block" && this.filterBy === "CTI Appl Name") {
    //   this.filterDataList = this.application;
    // } else if (this.show == "block" && this.filterBy === "Database Instance Name") {
    //   this.filterDataList = this.instance;
    // } else if (this.show == "block" && this.filterBy === "Database Schema Name") {
    //   this.filterDataList = this.schema;
    // } else if (this.show == "block" && this.filterBy === "Table Name") {
    //   this.filterDataList = this.table;
    // }

     
    for(let i=0;i<this.dbColumnNames.length;i++){
      if(this.dbColumnNames[i].name===this.filterBy){
        this.filterDataList=this.dbColumnNames[i].filterList;
      }
    }
    console.log("filter lis length"+this.filterDataList.length)
    this.allSelected = true;


    this.x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    this.y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    this.filterDiv.nativeElement.style.position = "absolute";
    this.filterDiv.nativeElement.style.display = "inline-block";
    this.filterDiv.nativeElement.style.left = this.x - 30 + 'px';
    this.filterDiv.nativeElement.style.top = this.y + 15 + 'px'


  }


  filterList() {
    //this.flag=false;   //future chnage needed
    console.log("----------------------------")
    console.log("-----------------------------")
    console.log("-----before filter------------")
    console.log("application length" + this.application.length);
    console.log("Intance length" + this.instance.length);
    console.log("schema length" + this.schema.length);
    console.log("table.length" + this.table.length);
    console.log("Filter by --->" + this.filterBy);
    console.log("pervious Filter by--->" + this.previousFilterBy);
    console.log("this.previousData length --->" + this.previousFilteredData.length);
    console.log("this.currentData length --->" + this.currentFilterdData.length);

    let tempData: any = [];
    let commonData: any = [];


    for(let i=1;i<this.dbColumnNames.length;i++){
      // console.log(this.dbColumnNames[i].isFiltered)
      if(this.dbColumnNames[i].name===this.filterBy){
        this.dbColumnNames[i].isFiltered=true;
        // console.log(this.dbColumnNames[i].isFiltered)
        break;
      } 
    }

    if (this.previousFilterBy.length <= 0) {
      this.previousFilterBy = this.filterBy;
      this.previousFilteredData = Object.assign([], this.allData);
      commonData = Object.assign([], this.previousFilteredData);
      tempData = this.doFilter(commonData)
      ///filter out kkrra hai
      this.currentFilterdData = tempData;
    } else {
      if (this.previousFilterBy === this.filterBy) {
        commonData = this.previousFilteredData;
        tempData = this.doFilter(commonData)
        this.currentFilterdData = tempData;
      } else {
        this.previousFilteredData = this.currentFilterdData
        commonData = this.currentFilterdData;
        tempData = this.doFilter(commonData)
        //filter
        this.currentFilterdData = tempData;
        this.previousFilterBy = this.filterBy;
      }
    }
  }
  doFilter(commonData: any) {

    let tempData = [];
    //------------------------------application
    var tempList:any=[];
    let u;
    for(u=0;u<this.dbColumnNames.length;u++){
      // console.log(this.dbColumnNames[u].name)
      // console.log(this.filterBy)
      if(this.dbColumnNames[u].name===this.filterBy){
        tempList=this.dbColumnNames[u].filterList;
        break;
      }
    }

    if(u>=this.dbColumnNames.length){
      console.log("something went wrong ------------------------")
    }
    console.log("filter by----"+this.dbColumnNames[u].Name)
      for (var i = 0; i < tempList.length; i++) {
        for (var j = 0; j < commonData.length; j++) {
          if (tempList[i].name === commonData[j][this.dbColumnNames[u].name] && tempList[i].isSelected === true) {
            tempData.push(commonData[j]);
          }
        }
      }


    console.log('tempData---->' + tempData.length);
    this.tableData = tempData;

    this.performFilter(tempData, this.filterBy);
    return tempData;
  }
  perfromMakeFilterList(tempData: any, data: any) {
    for (let i = 0; i < tempData.length; i++) {
      data.push({
        name: tempData[i],
        isSelected: true,
      });
    }
  }

  performFilter(tempData: any, filterBy: string) {
    //console.log("filter list function chala %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5")
    for(let j=1;j<this.dbColumnNames.length;j++){
      let temp:any=[];
      if(this.filterBy!=this.dbColumnNames[j].name)
        this.dbColumnNames[j].filterList=[];
      for (let i = 0; i < tempData.length; i++) {
        // console.log("99999"+this.dbColumnNames[j].filterList.includes(tempData[i][this.dbColumnNames[j].name]))
        // console.log(tempData[i][this.dbColumnNames[j].name])
        // console.log(this.dbColumnNames[j].filterList.length)
        if (!temp.includes(tempData[i][this.dbColumnNames[j].name]) && filterBy !== this.dbColumnNames[j].displayHeader)
        { 
          temp.push(tempData[i][this.dbColumnNames[j].name]);
          if(this.filterBy!=this.dbColumnNames[j].name) this.dbColumnNames[j].filterList.push({name:tempData[i][this.dbColumnNames[j].name],isSelected:true});
        }
       }
    }
    
}//function ends here


  searchByText() {
    console.log(this.searchBy);
    var searchBy=this.searchBy;
   for(let i=0;i<this.dbColumnNames.length;i++){
      if(this.dbColumnNames[i].name===this.filterBy){
        this.performSearchByText(this.dbColumnNames[i].filterList,searchBy);
        break;
      }
    }

  }

  performSearchByText(data: any,searchBy:string) {
    this.filterDataList = data.filter((d: any) => {
      if (d.name.toLowerCase().includes(searchBy.toLowerCase())) {
        d.isSelected = true;
        return true;
      } else {
        d.isSelected = false;
        return false;
      };
    });

    if (this.filterDataList.length <= 0) this.allSelected = false;
    if (this.filterDataList.length > 0) this.allSelected = true;
    //this.filterDataList=data;

  }

  selectAll(event: any) {
    var targetName=event.target.checked
    for(let i=0;i<this.dbColumnNames.length;i++){
      if(this.dbColumnNames[i].name===this.filterBy){
        this.performSelectAll(targetName,this.dbColumnNames[i].filterList);
        break;
      }
    }
  }//function ends here

  performSelectAll(value: boolean, data: any) {
    for (var i = 0; i < data.length; i++) {
      data[i].isSelected = value;
    }
    this.allSelected = value;

  }

  invertAll() {
     for(let i=0;i<this.dbColumnNames.length;i++){
      if(this.dbColumnNames[i].name===this.filterBy){
        this.performInvertAll(this.dbColumnNames[i].filterList);
        break;
      }
    }
  }

  performInvertAll(data: any) {
    let count = 0;
    for (var i = 0; i < data.length; i++) {
      data[i].isSelected = !data[i].isSelected;
      if (data[i].isSelected == true) count++;
    }
    if (count == data.length) this.allSelected = true;
    else this.allSelected = false;
  }

  toggleCheckbox(event: any) {
    let targetName = event.target.name;

    for(let i=0;i<this.dbColumnNames.length;i++){
      if(this.dbColumnNames[i].name===this.filterBy){
        this.performToogleCheckbox(this.dbColumnNames[i].filterList, targetName);
        break;
      }
    }
  }

  performToogleCheckbox(data: any, targetName: string) {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === targetName) data[i].isSelected = !data[i].isSelected;
      if (data[i].isSelected == false) continue;
      else count++;
    }

    console.log(count);
    if (count == data.length) this.allSelected = true;
    else this.allSelected = false;

  }

  clearAll() {
    console.log("clear all chala")

    for(let i=1;i<this.dbColumnNames.length;i++){
      this.dbColumnNames[i].isFiltered=false;
    }

    this.filterBy = ""


    this.tableData = Object.assign([], this.allData);
    this.show = false;
    
    this.filteredData = [];
    this.filterDataList = [];
    this.currentFilterdData = [];
    this.previousFilteredData = [];

    this.searchBy = "";
    this.allSelected = true;
    this.filterByPrevious = "";

    this.filterBy = "";
    this.previousFilterBy = "";
    
    //this.ddService.statusUpdate.emit(this.allData);
    this.performFilter(this.tableData, "");
    
  }
  public get TableData() {
    return this.tableData;
  }
} //class ends here
