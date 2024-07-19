// import { Component } from '@angular/core';

// @Component({
//   selector: 'ngx-detailscard',
//   styleUrls: ['./kite-detailscard.component.scss'],
//   templateUrl: './kite-detailscard.component.html',
// })

// export class kitedetailsComponent {
// }

import { Component, OnInit } from '@angular/core';
import { KiteApiService } from '../kite/kite-api.service';

@Component({
  selector: 'ngx-detailscard',
  styleUrls: ['./kite-detailscard.component.scss'],
  templateUrl: './kite-detailscard.component.html',
})
export class kitedetailsComponent implements OnInit {
  maxHeight: number;
  minHeight: number;
  totalAttempts: number;
  totalFlyingMins: number;

  constructor(private kiteApiService: KiteApiService) {}

  ngOnInit(): void {
    this.fetchCurrentWeekData();
  }

  fetchCurrentWeekData(): void {
    this.kiteApiService.getCurrentWeekData().subscribe(
      (data) => {
        console.log('API Response:', data); 
        if (data && data.current_week) {
          this.maxHeight = data.current_week.max_height;
          this.minHeight = data.current_week.min_height;
          this.totalAttempts = data.current_week.total_attempts;
          this.totalFlyingMins = data.current_week.total_flying_mins;
        } else {
          console.error('Invalid data structure:', JSON.stringify(data, null, 2));
        }
      },
      (error) => {
        console.error('Error fetching current week data:', error);
      }
    );
  }
}
