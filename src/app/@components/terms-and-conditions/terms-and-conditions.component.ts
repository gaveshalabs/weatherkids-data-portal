import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('TermsAndConditionsComponent');
  }
}
