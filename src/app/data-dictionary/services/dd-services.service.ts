import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../entity/Data';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DdServicesService {


  statusUpdate = new EventEmitter<any[]>();
  constructor(private http: HttpClient) {
    this.getAllData();
   }

  tableData:any[]=[];
  private baseURL = "http://localhost:9091/dgui/"
  headers = new HttpHeaders({
    'Content-Type': 'application/json' });
  options = { headers: this.headers };
  // getAll(){
  //   console.log("table data "+this.tableData.length)
  //   console.log(this.tableData)
  //   return this.tableData.length>0?this.tableData:null;
  // }
  getAllData() {
    this.http.get<Data[]>(this.baseURL + "getAll/").subscribe(response=>{
      this.tableData=JSON.parse(JSON.stringify(response))
      console.log("jsdjsd",this.tableData)
      this.statusUpdate.emit(this.tableData);
    },error=>{
      console.log("something went wrong");
    });
  }
  getMaxId(){
    return this.http.get(this.baseURL+"getMaxId/");
  }
  // editRow(record : any){
  //   return this.http.post<any>(this.baseURL+"editRow/",record,this.options);
  // }
  editRow(record : any,uid:number){
     return this.http.post<any>(this.baseURL+"editRow/"+uid,record,this.options).subscribe(()=>{
       this.getAllData();
     });

     
    
    }
}


