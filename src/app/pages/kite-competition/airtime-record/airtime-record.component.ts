import { Component, OnInit } from '@angular/core';
import { KiteApiService } from '../kite/kite-api.service';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';

@Component({
  selector: 'ngx-airtimerecord',
  styleUrls: ['./airtime-record.component.scss'],
  templateUrl: './airtime-record.component.html',
})
export class AirtimeRecordComponent implements OnInit {
  totalFlyingTime: string = '0 mins';
  private actualFlyingTime: number = 0; // Actual value fetched from API

  constructor(private kiteApiService: KiteApiService) {}

  ngOnInit() {
    this.kiteApiService.getLatestDataForAllPlayers().subscribe(
      (data: TotalKiteData) => {
        console.log('Fetched latest data:', data); // Debugging log
        if (data && data.total_flying_mins) {
          this.actualFlyingTime = data.total_flying_mins;
          this.animateFlyingTime();
        } else {
          this.totalFlyingTime = '-';
        }
      },
      (error) => {
        console.error('Error fetching total flying time:', error);
        this.totalFlyingTime = 'Error loading data';
      }
    );
  }

  private animateFlyingTime(): void {
    const duration = 2000; // Duration of the animation in milliseconds
    const interval = 50; // Interval for each frame of the animation
    const steps = duration / interval;
    const increment = 100; // Increment by 100 minutes per step
    let currentFlyingTime = 0;

    const timer = setInterval(() => {
      currentFlyingTime += increment;
      if (currentFlyingTime >= this.actualFlyingTime) {
        clearInterval(timer);
        this.totalFlyingTime = `${this.actualFlyingTime} mins`;
      } else {
        this.totalFlyingTime = `${currentFlyingTime} mins`;
      }
    }, interval);
  }
}
