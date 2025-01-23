import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { NbCardModule } from '@nebular/theme';
import { KiteApiService } from '../kite/kite-api.service';
import { DistrictData } from '../../../@components/leaderboard/leaderboard.interface';

Chart.register(...registerables);

@Component({
    selector: 'ngx-heightbarchart',
    standalone: true,
    imports: [NbCardModule],
    templateUrl: './district-attempt-barchart.component.html',
    styleUrls: ['./district-attempt-barchart.component.scss'],
})
export class DistrictvsAttemptbarchartComponent implements OnInit {
    chart;

    constructor(private kiteApiService: KiteApiService) {}

    ngOnInit(): void {
        this.kiteApiService.getNearestDistrictData().subscribe((data: DistrictData[] | null) => {
            if (data && data.length > 0) {
                // Process data to get labels and attempts
                const nearestDistricts = data.map(d => d.nearest_district);
                const totalAttempts = data.map(d => d.total_attempts);

                // Update chart configuration
                this.config.data.labels = nearestDistricts;
                this.config.data.datasets[0].data = totalAttempts;

                // Create the chart
                this.chart = new Chart('DistrictvsAttemptChart', this.config);
            } else {
                console.error('No data received or data is empty');
                // Optionally, handle the case where no data is returned
            }
        }, (error) => {
            console.error('Error fetching data:', error);
            // Optionally, handle the error scenario
        });
    }

    public config = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Attempt',
                    data: [], // Data will be dynamically set
                    backgroundColor: 'rgb(102, 187, 106)',
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                    position: 'top',
                },
            },
        },
    };
}




