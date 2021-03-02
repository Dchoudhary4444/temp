import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataGridComponent } from './data-grid/data-grid.component';
import { DdServicesService } from './services/dd-services.service';

@Component({
  selector: 'app-data-dictionary',
  templateUrl: './data-dictionary.component.html',
  styleUrls: ['./data-dictionary.component.scss']
})
export class DataDictionaryComponent implements OnInit {

  public tableData: any[] = [];
  constructor(
    private ddService: DdServicesService
  ) { }

  ngOnInit() {
  //  let temp= this.ddService.getAll();
  //  if(temp==null){
  //   console.log("Gadbad hogyi");
  //  }else{
  //    this.tableData=temp;
  //  }

   this.ddService.statusUpdate.subscribe((data: any) => {
    this.tableData=data;
    console.log("********************************************subscribe chala",this.tableData.length)
    });


  }
  // TO-DO: Get the value of table data from data-dictionary component
  eventHandler(event: any) {
    console.log('event handler chala');
    console.log(event, "tabledata", this.tableData);
    this.tableData = event;
  }
}


