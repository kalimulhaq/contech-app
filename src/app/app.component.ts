import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  pageLoader = false;
  company: any;
  association: any;
  companyBg: string;
  associationBg: string;

  constructor(

  ) { }

  ngOnInit() {

  }


}
