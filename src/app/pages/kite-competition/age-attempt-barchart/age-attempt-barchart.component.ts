import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { NbCardModule } from '@nebular/theme';
import { KiteApiService } from '../kite/kite-api.service';
import { AgeGroupData } from '../../../@components/leaderboard/leaderboard.interface';

Chart.register(...registerables);

@Component({
    selector: 'ngx-ageattemptbarchart',
    standalone: true,
    imports: [NbCardModule],
    templateUrl: './age-attempt-barchart.component.html',
    styleUrls: ['./age-attempt-barchart.component.scss'],
})
export class AgeAttemptbarchartComponent implements OnInit {
    chart;

    constructor(private kiteApiService: KiteApiService) {}

    ngOnInit(): void {
        this.kiteApiService.getAgeGroupData().subscribe((data: AgeGroupData[] | null) => {
            if (data && data.length > 0) {
                // Process data to get labels and attempts
                const ageGroups = data.map(d => d.age_group);
                const totalAttempts = data.map(d => d.total_attempts);

                // Update chart configuration
                this.config.data.labels = ageGroups;
                this.config.data.datasets[0].data = totalAttempts;

                // Create the chart
                this.chart = new Chart('HeightChart', this.config);
            } else {
                console.error('No data received or data is empty');
                // Optionally, handle the case where no data is returned
            }
        }, (error) => {
            console.error('Error fetching data:', error);
            // Optionally, handle the error scenario
        });
    }

    public config: ChartConfiguration<"bar"> = {
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
