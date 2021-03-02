import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() displayVar:string="none"
  @Input() message_to_display="Preparing your data for Hackathon 2020... Please wait..."
  constructor() { 
   
  }

  ngOnInit(): void {
    let out=document.getElementById('disableBgDivLoader');
   if(out)
   {
     out.style.display=this.displayVar;
     console.log("in On init constructor")
   }
   
  }
  ngOnChanges()
  {
    let out=document.getElementById('disableBgDivLoader');
    if(out)
    {
      out.style.display=this.displayVar;
      console.log("in loader onChanges ")
    }
  }

}
