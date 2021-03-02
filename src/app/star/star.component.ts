import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LawDataService } from '../law-data.service';


@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {

  NoOfTables = 0;
  table_var: number[] = [];
  tab_number = [1];
  display_loader = "none"

  popUpConfiguration = {
    headerName: "",
    content: ""
  }

  option_array = ['Finance', 'Employee', 'Hospital', 'Law', 'School']
  numberOfColsArr = { "tab1": [1] }
  selected_template = "";
  language_array = ['English', 'Hindi', 'Japanese', 'French', 'Italian', 'Spanish', 'Chinese', 'Arabic']
  max = 1;
  data: any[] = [{
    "table": "table" + (this.max),
    "size": 10,
    "output": "CSV",
    "language": "English",
    "colvalues": [
      { "col": "", "dt": "varchar(max)", "cat": "random" }
    ]
  }]
  cat_array = ['random', 'State', 'address', 'city', 'country', 'postcode', 'street_address', 'license_plate', 'color_name', 'credit_card_expire', 'credit_card_number', 'credit_card_provider', 'currency_code', 'currency_name', 'currency_symbol', 'date', 'time', 'year', 'file_name', 'local_latlng', 'ascii_free_email', 'ipv4', 'mac_address', 'safe_email', 'job', 'paragraph', 'sentences', 'boolean', 'first_name', 'first_name_female', 'first_name_male', 'language_name', 'last_name', 'name', 'prefix', 'phone_number']
  data_type_array = ['tinyint', 'smallint', 'int', 'bigint', 'nvarchar', 'nvarchar2', 'char', 'varchar(max)', 'varchar2', 'datetime', 'text', 'timestamp', 'float', 'numeric', 'date', 'real', 'bit', 'number']
  output_formats = ['CSV', 'SQL', 'SNOWFLAKE', 'ORACLE', 'HIVE', 'MONGODB', 'IBM_DB2', 'CASSANDRA', 'JSON'];

  cur_tab = this.data[0]['table']
  baseurl = "http://localhost:5000/"

  displayConfirmBtns: boolean = true;
  constructor(private lds: LawDataService, private http: HttpClient) { }


  ngOnInit(): void {
  }
  showPopUp(header: string, conetent: string) {
    console.log('In Show popup')
    this.popUpConfiguration.headerName = header;
    this.popUpConfiguration.content = conetent;
    let outBG = document.getElementById("disableBigDivId");
    let outPP = document.getElementById("popUpId");
    if (outBG) {
      outBG.style.display = "block";
    }
    if (outPP) {
      outPP.style.display = "block";
    }


  }
  hidePopup() {
    let outBG = document.getElementById("disableBigDivId");
    let outPP = document.getElementById("popUpId");
    if (outBG) {
      outBG.style.display = "none";
    }
    if (outPP) {
      outPP.style.display = "none";
    }
    this.displayConfirmBtns = true;
  }

  submit_form() {

    console.log(this.data)
    // alert("form submited")
    this.display_loader = ""
    this.http.post(this.baseurl + 'GenerateTableSQL', this.data).subscribe(data => {
      this.hidePopup();
      this.displayConfirmBtns = false;
      this.showPopUp('Success', 'Data has been successfully generated! Please verify your data');
      this.display_loader = "none";

    },
      error => {
        this.hidePopup();
        this.displayConfirmBtns = false;
        this.display_loader = "none"
        if (error['status'] == 200) {

          this.displayConfirmBtns = false;
          this.showPopUp('Success', 'Data has been successfully generated! Please verify your data');

        }
        else {
          this.displayConfirmBtns = false;
          this.showPopUp('Try Again Later', 'Somehing went Wrong during data generation!');

        }

      }
    )
    this.hidePopup();
  }
  add_column(tab: string) {
    //onsole.log("Tab : "+tab)
    let tempvar = this.data.filter(u =>
      u['table'] === tab
    )
    console.log(tempvar)
    tempvar[0]['colvalues'].push({ "col": "", "dt": "varchar(max)", "cat": "random" })
    // let max = Math.max.apply(null, this.numberOfColsArr[tab]);
    // this.numberOfColsArr[tab].push(max + 1)
    // console.log(this.numberOfColsArr[tab])
  }
  remove_col(table: any, column: any) {
    let tempvar = this.data.find(u =>
      u['table'] === table
    )
    console.log(tempvar)
    let ind1 = this.data.indexOf(tempvar);
    let tempcol = tempvar['colvalues'].find((m: { [x: string]: any; }) =>
      m['col'] === column)
    let ind = tempvar['colvalues'].indexOf(tempcol)
    if (ind > -1) {
      this.data[ind1]['colvalues'].splice(ind, 1)
    }

  }

  create_table_var() {
    this.table_var = []
    for (let index = 1; index < Number(this.NoOfTables) + 1; index++) {
      this.table_var.push(index)
    }
    console.log(this.table_var)
  }
  add_tab() {
    // let max = Math.max.apply(null, this.tab_number);
    // this.tab_number.push(max + 1)
    // this.numberOfColsArr['tab'+(max+1)]=[1]
    // console.log(this.data)
    this.data.push({
      "table": "table" + (this.max + 1),
      "size": 10,
      "output": "CSV",
      "language": "English",
      "colvalues": [
        { "col": "", "dt": "varchar(max)", "cat": "random" }
      ]
    })
    this.max = (this.max + 1)
  }
  remove_tab(tab_name: string) {
    console.log(tab_name)
    let tempvar = this.data.find(u =>
      u['table'] === tab_name
    )
    console.log(tempvar)
    const index = this.data.indexOf(tempvar);
    console.log(index)
    if (index > -1) {
      this.data.splice(index, 1);

    }

  }
  new_template() {
    this.selected_template = ""
    this.max = 1
    this.data = [{
      "table": "table" + (this.max),
      "size": 10,
      "output": "CSV",
      "colvalues": [
        { "col": "", "dt": "varchar(max)", "cat": "random" }
      ]
    }]
    this.cur_tab = this.data[0]['table']
  }



  template_selected() {
    console.log(this.selected_template)
    switch (this.selected_template) {
      case 'Finance': {
        // this.tab_number=[1,2,3,4,5,6]
        this.data = this.lds.get_finance_data();
        this.cur_tab = this.data[0]['table']
        break;
      }
      case 'School': {
        // this.tab_number=[1,2,3]

        break
      }
      case 'Employee': {
        // this.tab_number=[1,2]
        this.data = this.lds.get_empoyee_data();
        this.cur_tab = this.data[0]['table']
        break;
      }
      case 'Hospital': {
        // this.tab_number=[1,2,3,4,5]
        this.data = this.lds.get_hospital_data();
        this.cur_tab = this.data[0]['table']
        break;
      }
      case 'Law': {
        this.data = this.lds.get_law_data();
        this.cur_tab = this.data[0]['table']
        break;
      }
    }

  }
}
