import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LawDataService {

  constructor() { }

  law_data=[
    {
      "table": "lawsuit_settlements",
       "size" : 10,
       "output" : "CSV",
       "colvalues" : [
         {"col":"case_name" , "dt": "varchar(max)", "cat": "name"},
         {"col":"incident_date" , "dt": "date", "cat": "time"},
         {"col":"department" , "dt": "varchar(max)", "cat": "file_name"},
         {"col":"amount" , "dt": "int", "cat": "random"},
         {"col":"case_desc" , "dt": "varchar(max)", "cat": "paragraph"}         
       ]
    },
    {
      "table": "lawsuit_settlement",
       "size" : 10,
       "output" : "CSV",
       "colvalues" : [
         {"col":"case_name" , "dt": "number", "cat": "name"},
         {"col":"incident_date" , "dt": "date", "cat": "time"},
         {"col":"department" , "dt": "varchar(max)", "cat": "file_name"},
         {"col":"amount" , "dt": "number", "cat": "random"},
         {"col":"case_desc" , "dt": "varchar(max)", "cat": "paragraph"}         
       ]
    },
    {
      "table": "award_settlement",
       "size" : 10,
       "output" : "CSV",
       "colvalues" : [
         {"col":"case_name" , "dt": "number", "cat": "name"},
         {"col":"incident_date" , "dt": "date", "cat": "time"}      
       ]
    }
  ]

  // finance data

  finance_data=[
    {
      "table": "card",
       "size" : 10,
       "output" : "CSV", 
      "language" : "English",
       "colvalues" : [
         {"col":"order_id" , "dt": "int", "cat": "random"},
         {"col":"card_holder_first_name" , "dt": "varchar(max)", "cat": "first_name"},
         {"col":"card_holder_last_name" , "dt": "varchar(max)", "cat": "last_name"},
         {"col":"card_number" , "dt": "varchar(max)", "cat": "credit_card_number"},
         {"col":"expiry_date" , "dt": "date", "cat": "credit_card_expire"}         
       ]
    },
    {
      "table": "loan",
       "size" : 10,
       "output" : "CSV", 
      "language" : "English",
       "colvalues" : [
         {"col":"loan_id" , "dt": "int", "cat": "random"},
         {"col":"currency" , "dt": "varchar(max)", "cat": "currency_name"},
         {"col":"duration_in_yrs" , "dt": "real", "cat": "random"},
         {"col":"amount" , "dt": "real", "cat": "random"},
         {"col":"issue_date" , "dt": "date", "cat": "random"}         
       ]
    },
    {
      "table": "account",
       "size" : 10,
       "output" : "CSV", 
        "language" : "English",
       "colvalues" : [
         {"col":"account_id" , "dt": "int", "cat": "random"},
         {"col":"holder" , "dt": "varchar(max)", "cat": "name"},
         {"col":"country" , "dt": "varchar(max)", "cat": "country"},
         {"col":"zipcode" , "dt": "varchar(max)", "cat": "postcode"},
         {"col":"contact" , "dt": "bigint", "cat": "phone_number"},
         {"col":"email" , "dt": "varchar(max)", "cat": "safe_email"}      
       ]
    }
  ]

  // empoyee data

  empoyee_data=[
    {
      "table": "salaries",
       "size" : 10,
       "output" : "CSV", 
      "language" : "English",
       "colvalues" : [
         {"col":"emp_no" , "dt": "int", "cat": "random"},
         {"col":"salary" , "dt": "real", "cat": "random"},
         {"col":"from_date" , "dt": "date", "cat": "date"},
         {"col":"to_date" , "dt": "date", "cat": "date"}
                 
       ]
    },
    {
      "table": "titles",
       "size" : 10,
       "output" : "CSV", 
      "language" : "English",
       "colvalues" : [
        {"col":"emp_no" , "dt": "int", "cat": "random"},
        {"col":"title" , "dt": "varchar(max)", "cat": "job"},
        {"col":"from_date" , "dt": "date", "cat": "date"},
        {"col":"to_date" , "dt": "date", "cat": "date"}        
       ]
    },
    {
      "table": "dept_manager",
       "size" : 10,
       "output" : "CSV", 
      "language" : "English",
       "colvalues" : [
        {"col":"emp_no" , "dt": "int", "cat": "random"},
        {"col":"dept_no" , "dt": "int", "cat": "random"},
        {"col":"from_date" , "dt": "date", "cat": "date"},
        {"col":"to_date" , "dt": "date", "cat": "date"}       
       ]
    },
    {
      "table": "employees",
       "size" : 10,
       "output" : "CSV", 
        "language" : "English",
       "colvalues" : [
        {"col":"emp_no" , "dt": "int", "cat": "random"},
        {"col":"birth_date" , "dt": "date", "cat": "date"} ,
         {"col":"first_name" , "dt": "varchar(max)", "cat": "first_name"},
         {"col":"last_name" , "dt": "varchar(max)", "cat": "last_name"},
         {"col":"hire_date" , "dt": "date", "cat": "date"}         
       ]
    },
    {
      "table": "departments",
       "size" : 10,
       "output" : "CSV", 
        "language" : "English",
       "colvalues" : [
         {"col":"dept_no" , "dt": "int", "cat": "random"},
         {"col":"dept_name" , "dt": "varchar(max)", "cat": "random"},
                
       ]
    },
    {
      "table": "dept_emp",
       "size" : 10,
       "output" : "CSV", 
        "language" : "English",
       "colvalues" : [
         {"col":"account_id" , "dt": "int", "cat": "random"},
         {"col":"holder" , "dt": "varchar(max)", "cat": "name"},
         {"col":"country" , "dt": "varchar(max)", "cat": "country"},
         {"col":"zipcode" , "dt": "varchar(max)", "cat": "postcode"},
         {"col":"contact" , "dt": "bigint", "cat": "phone_number"},
         {"col":"email" , "dt": "varchar(max)", "cat": "safe_email"}      
       ]
    }
  ]


  // hospital data

  hospital_data=[
    {
      "table": "doctor",
       "size" : 10,
       "output" : "CSV", 
        "language" : "English",
       "colvalues" : [
        {"col":"emp_no" , "dt": "int", "cat": "random"},
         {"col":"case_name" , "dt": "varchar(max)", "cat": "name"},
         {"col":"first_name" , "dt": "varchar(max)", "cat": "first_name"},
         {"col":"last_name" , "dt": "varchar(max)", "cat": "last_name"},
         {"col":"call_time" , "dt": "date", "cat": "time"},
         {"col":"salary" , "dt": "bigint", "cat": "random"}        
       ]
    },
    {
      "table": "patient",
       "size" : 10,
       "output" : "CSV", 
      "language" : "English",
       "colvalues" : [
        {"col":"first_name" , "dt": "varchar(max)", "cat": "first_name"},
        {"col":"last_name" , "dt": "varchar(max)", "cat": "last_name"},
        {"col":"contact" , "dt": "bigint", "cat": "phone_number"},
        {"col":"email" , "dt": "varchar(max)", "cat": "safe_email"},
        {"col":"biling_cost" , "dt": "real", "cat": "random"},
               
       ]
    },
    {
      "table": "non_medical_staff",
       "size" : 10,
       "output" : "CSV", 
      "language" : "English",
       "colvalues" : [
        {"col":"emp_no" , "dt": "int", "cat": "random"},
        {"col":"dept_name" , "dt": "varchar(max)", "cat": "random"},
        {"col":"first_name" , "dt": "varchar(max)", "cat": "first_name"},
        {"col":"last_name" , "dt": "varchar(max)", "cat": "last_name"},
        {"col":"call_time" , "dt": "date", "cat": "time"},
        {"col":"salary" , "dt": "bigint", "cat": "random"}         
       ]
    },
    {
      "table": "account_details",
       "size" : 10,
       "output" : "CSV", 
       "language" : "English",
       "colvalues" : [
        {"col":"dr_emp_no" , "dt": "int", "cat": "random"},
        {"col":"patient_name" , "dt": "varchar(max)", "cat": "name"},
         {"col":"cost" , "dt": "bigint", "cat": "random"},
         {"col":"next_call_time" , "dt": "date", "cat": "time"}    
       ]
    }
  ]


  

  get_law_data()
  {
    return this.law_data;
  }

  get_hospital_data()
  {
    return this.hospital_data;
  }

  get_finance_data()
  {
    return this.finance_data;
  }

  get_empoyee_data()
  {
    return this.empoyee_data;
  }

}
