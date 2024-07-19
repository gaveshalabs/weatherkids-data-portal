import { Component, OnInit } from '@angular/core';
import { KiteApiService } from '../kite/kite-api.service';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';

@Component({
  selector: 'ngx-totalattemps',
  styleUrls: ['./total-attemps.component.scss'],
  templateUrl: './total-attemps.component.html',
})
export class TotalAttempsComponent implements OnInit {
  totalAttempts: string = '0'; 
  displayedAttempts: number = 0;

  constructor(private kiteApiService: KiteApiService) {}

  ngOnInit() {
    this.kiteApiService.getLatestDataForAllPlayers().subscribe(
      (data: TotalKiteData) => {
        console.log('Fetched latest data:', data);  
        if (data && data.total_attempts != null) {
          this.animateAttempts(data.total_attempts);
        } else {
          this.totalAttempts = '-';
        }
      },
      (error) => {
        console.error('Error fetching total attempts:', error);
        this.totalAttempts = 'Error loading data';
      }
    );
  }

  animateAttempts(targetAttempts: number) {
    const duration = 3000; 
    const interval = 50; 
    const steps = duration / interval;
    const increment = 10; 
    let currentAttempts = 0;

    const timer = setInterval(() => {
      currentAttempts += increment;
      if (currentAttempts >= targetAttempts) {
        clearInterval(timer);
        this.totalAttempts = `${targetAttempts} +`;
      } else {
        this.totalAttempts = `${currentAttempts} +`;
      }
    }, interval);
  }
}
