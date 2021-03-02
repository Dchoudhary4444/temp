import { HttpClient } from '@angular/common/http';

import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DdServicesService } from '../services/dd-services.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  application: string[] = ['All'];
  instance: string[] = ['All'];
  schema: string[] = ['All'];
  table: string[] = ['All'];
  public tableData: any;
  filteredData: any = [];
  allData: any = [];


  currentFilterdData:any=[];
  previousFilteredData:any=[];
  filterDataList:any=[];



  selectApplication="All"
  selectInstance="All"
  selectSchema="All"
  selectTable="All"
 //filterByPrevious:string="";


  filterBy: string = '';
  previousFilterBy:string='';
  value:string="";

  constructor(private http: HttpClient, private ddService:DdServicesService) {

    //this.selectApplication="pappu"
  }




  onOptionsSelected(event:any){
    //this.value=value;
    console.log("function chala")
    console.log(event.target.value)
    console.log(event.target.id)
    this.value=event.target.value;
    this.filterBy=event.target.id;
  }

  filterByAll(commonData:any[]){
    let tempData:any=[];
    tempData = commonData.filter(
      (item: any) => item.citiApplicationName === this.selectApplication
    );
      if(tempData.length<=0){
      commonData=Object.assign([],this.allData);
      tempData=[];
      }
      else{
        commonData=Object.assign([],tempData)
        tempData=[];
      }

      console.log("*************************************888")
      console.log("application filter k bad "+commonData.length);
  // //-------------------------Instance

    tempData = commonData.filter(
      (item: any) => item.dbInstanceName === this.selectInstance
    );


    if(tempData.length<=0){
      commonData=Object.assign([],commonData);
      tempData=[];
      }
      else{
        commonData=Object.assign([],tempData)
        tempData=[];
      }
      console.log("application filter k bad "+commonData.length);

  //-------------------------Schema
      console.log("schema s phle "+commonData.length);
    tempData = commonData.filter(
      (item: any) => item.dbSchemaName === this.selectSchema
    );
    if(tempData.length<=0){
      commonData=Object.assign([],commonData);
      tempData=[];
      }
      else{
        commonData=Object.assign([],tempData)
        tempData=[];
      }
      console.log("application filter k bad "+commonData.length);
  // //--------------table

    tempData = commonData.filter(
      (item: any) => item.tabelName === this.selectTable
    );
    if(tempData.length<=0){
      commonData=Object.assign([],commonData);
      tempData=[];
      }
      else{
        commonData=Object.assign([],tempData)
        tempData=[];
      }



    this.application=["All"];
    this.instance=["All"];
    this.schema=["All"];
    this.table=["All"];
    this.performFilter(commonData,"");
    return commonData;

  }//function ends here
  filterList(value: string, filterBy: string) {
    console.log("----------------------------")
    console.log("-----------------------------")
    console.log("-----before filter------------")
    console.log("application length"+this.application.length);
    console.log("Intance length"+this.instance.length);
    console.log("schema length"+this.schema.length);
    console.log("table.length"+this.table.length);
    console.log("Filter by --->"+filterBy);
    console.log("pervious Filter by--->"+this.previousFilterBy);
    console.log("this.previousData length --->"+this.previousFilteredData.length);
    console.log("this.currentData length --->"+this.currentFilterdData.length);
    let tempData: any = [];

    let commonData:any=[];

    if(value==="All"){
      console.log("All--------------wale if me gya")
      console.log(this.selectApplication)
      console.log(this.selectInstance);
      console.log(this.selectSchema)
      console.log(this.selectTable)

      // commonData=Object.assign([],this.previousFilteredData);
      // console.log(this.performFilter(commonData,""))
      // this.childEvent.emit(commonData);

      commonData=Object.assign([],this.allData);
      tempData=this.filterByAll(commonData);
      // this.childEvent.emit(tempData);
      this.ddService.statusUpdate.emit(tempData);
      this.previousFilterBy=this.filterBy;
      this.currentFilterdData=tempData;

      //------------------------------application


    }
    else{

    if(this.previousFilterBy.length<=0){
      this.previousFilterBy=filterBy;
      this.previousFilteredData=Object.assign([],this.allData);
      commonData=Object.assign([],this.previousFilteredData);

      tempData=this.doFilter(commonData,value,this.filterBy)
      ///filter out kkrra hai

      this.currentFilterdData=tempData;

    }else{
      if(this.previousFilterBy===this.filterBy){
          commonData=this.previousFilteredData;

          tempData=this.doFilter(commonData,value,this.filterBy)

          this.currentFilterdData=tempData;
      }else{

          this.previousFilteredData=this.currentFilterdData
          commonData=this.currentFilterdData;

          tempData=this.doFilter(commonData,value,this.filterBy)
                    //filter

          this.currentFilterdData=tempData;
          this.previousFilterBy=this.filterBy;
      }
    }
    // this.childEvent.emit(tempData);
    this.ddService.statusUpdate.emit(tempData);
  }

  }


   doFilter(commonData:any,value:string,filterBy:string){

    let tempData=[];

    //------------------------------application
    if (filterBy === 'Application') {
      this.instance = ['All'];
      this.schema = ['All'];
      this.table = ['All'];
      tempData = commonData.filter(
        (item: any) => item.citiApplicationName === value
      );

    }

    //-------------------------Instance
    if (filterBy === 'Instance') {
      //this.filteredData = this.allData;
      this.application = ['All'];
      this.schema = ['All'];
      this.table = ['All'];
      tempData = commonData.filter(
        (item: any) => item.dbInstanceName === value
      );

    }

    //-------------------------Schema
    if (filterBy === 'Schema') {

      this.instance = ['All'];
      this.application = ['All'];
      this.table = ['All'];
      tempData = commonData.filter(
        (item: any) => item.dbSchemaName === value
      );

    }

    //--------------table
    if (filterBy === 'Table') {
      this.instance = ['All'];
      this.schema = ['All'];
      this.application = ['All'];
      tempData = commonData.filter(
        (item: any) => item.tabelName === value
      );

    }


  console.log('tempData---->' + tempData.length);
  //this.tableData = tempData;
  this.performFilter(tempData,filterBy);
  return tempData;

  }//function ends here

  loadData() {
    // this.http.get("http://localhost:9091/dgui/getAll").subscribe(data => {
    //   this.tableData = data;
    //   this.filteredData=this.tableData;
    //   this.performFilter(this.tableData,"")
    // })

    // this.tableData=[{"citiApplicationName":"EUC","dbInstanceName":"DSGX","dbSchemaName":"GBO_EUC","tabelName":"DAILY_GLOBAL","dataType":"char(17)","columnName":"ABC"},{"citiApplicationName":"DENSIFY","dbInstanceName":"GIP_EDW","dbSchemaName":"CLIENTRPT","tabelName":"STATUS","dataType":"int","columnName":"XYZ"},{"citiApplicationName":"DUC","dbInstanceName":"XYZ","dbSchemaName":"GBU_EYC","tabelName":"WEEKLY_GLOBAL","dataType":"char(20)","columnName":"PQR"},{"citiApplicationName":"SDT","dbInstanceName":"GOP_EDW","dbSchemaName":"CLIENTRPT","tabelName":"STATUS","dataType":"int","columnName":"XYZ"},{"citiApplicationName":"EUC","dbInstanceName":"DSGX","dbSchemaName":"GBO_EUC","tabelName":"DAILY_GLOBAL","dataType":"char(17)","columnName":"PQR"},{"citiApplicationName":"DENSIFY","dbInstanceName":"GOP_EDW","dbSchemaName":"CLIENTRPT","tabelName":"REPORT","dataType":"varchar(20)","columnName":"XYZ"},{"citiApplicationName":"EOP","dbInstanceName":"DSGX","dbSchemaName":"GBO_EOP","tabelName":"DAILY_GLOBAL","dataType":"char(17)","columnName":"UVW"},{"citiApplicationName":"DENSIFY","dbInstanceName":"GIP_EDW","dbSchemaName":"CLIENTRPT","tabelName":"REPORT","dataType":"int","columnName":"ABC"},{"citiApplicationName":"EUC","dbInstanceName":"newDb","dbSchemaName":"GBO_EUC","tabelName":"DAILY_GLOBAL","dataType":"char(17)","columnName":"ABC"}]
    this.ddService.statusUpdate.subscribe((data: any) => {
      console.log("djkcn", data.length)
      this.tableData = data;
      console.log("1", this.tableData);
      this.filteredData = this.tableData;
      console.log("2", this.filteredData);
      if(this.allData.length<=0) this.allData = Object.assign([],this.tableData)
      this.performFilter(this.tableData, '');
    });

    // console.log("in search component -----------------"+this.tableData.length)
    // this.filteredData = this.tableData;
    // this.allData = this.tableData;
    // this.performFilter(this.tableData, '');

  }

  performFilter(tempData: any, filterBy: string) {
    for (var i = 0; i < tempData.length; i++) {
      // console.log(this.tableData[i])
      if (!this.application.includes(tempData[i].citiApplicationName) && filterBy !== 'Application')
        this.application.push(tempData[i].citiApplicationName);
      if (!this.instance.includes(tempData[i].dbInstanceName) && filterBy !== 'Instace')
        this.instance.push(tempData[i].dbInstanceName);
      if (!this.schema.includes(tempData[i].dbSchemaName) && filterBy !== 'Schema')
        this.schema.push(tempData[i].dbSchemaName);
      if (!this.table.includes(tempData[i].tabelName) && filterBy !== 'Table')
        this.table.push(tempData[i].tabelName);
    }
    // console.log(this.application);
    // console.log(this.table);

    if(this.application.length==2 ) this.selectApplication=this.application[1];
    else if(this.filterBy!=='Application') this.selectApplication=this.application[0]
    if(this.instance.length==2) this.selectInstance=this.instance[1];
    else if(this.filterBy!=='Instance') this.selectInstance=this.instance[0]
    if(this.schema.length==2) this.selectSchema=this.schema[1];
    else if(this.filterBy!=='Schema') this.selectSchema=this.schema[0]
    if(this.table.length==2) this.selectTable=this.table[1]
    else if(this.filterBy!=='Table') this.selectTable=this.table[0]    

 
  }
  ngOnInit(): void {
    this.loadData();
  }

 
  search() {
    console.log('search functioin chala');
    //this.childEvent.emit(this.filteredData); //sent data to parent
    //this.tableData = this.allData;   //reset the value to orignal;
    console.log(this.value)
    console.log(this.filterBy)
    if(this.filterBy.length>0) this.filterList(this.value, this.filterBy)
  }

  resetValues() {
    console.log('reset function chala');
    this.application=["All"];
    this.instance=["All"];
    this.schema=["All"];
    this.table=["All"];


    this.filteredData=[];
    this.filterDataList=[];
    this.currentFilterdData=[];
    this.previousFilteredData=[];

    this.value="";
    this.filterBy="";
    this.previousFilterBy="";
    this.tableData=this.allData;
  //  this.ngOnInit();
    this.performFilter(this.tableData, "");
    this.selectApplication="All"
    this.selectInstance="All"
    this.selectSchema="All"
    this.selectTable="All"
    // this.childEvent.emit(this.tableData);
    this.ddService.statusUpdate.emit(this.tableData);
  }
}
