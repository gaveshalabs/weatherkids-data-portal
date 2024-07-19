import { Component, Input, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ngx-solar',
  styleUrls: ['./solar.component.scss'],
  templateUrl: './solar.component.html',
})
export class SolarComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() value: number = 75; 

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setProgress(this.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.setProgress(this.value);
    }
  }

  private setProgress(value: number) {
    const circle = document.querySelector('.progress-ring__circle') as SVGCircleElement;
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    const offset = circumference - (value / 100) * circumference;
    circle.style.strokeDashoffset = `${offset}`;
  }
}
