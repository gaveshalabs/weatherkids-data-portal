import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-value-card',
  templateUrl: './data-value-card.component.html',
  styleUrls: ['./data-value-card.component.scss']
})
export class DataValueCardComponent implements OnInit {
  @Input() type: string = '';
  @Input() value: string = '0';
  @Input() icon: string = '';
  @Input() tooltip: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
