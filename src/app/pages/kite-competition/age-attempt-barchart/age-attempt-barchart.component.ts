import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { NbCardModule } from '@nebular/theme';

Chart.register(...registerables);

@Component({
    selector: 'ngx-ageattemptbarchart',
    standalone: true,
    imports: [RouterOutlet, RouterLink, NbCardModule],
    templateUrl: './age-attempt-barchart.component.html',
    styleUrls: ['./age-attempt-barchart.component.scss'],
})
export class AgeAttemptbarchartComponent implements OnInit {
    public config: any = {
        type: 'bar',
        data: {
            labels: ['0-10', '10-20', '20-30', '30-40', '40-50'],
            datasets: [
                {
                    label: 'Attempt',
                    data: [200, 300, 500, 800, 100],
                    backgroundColor: 'rgb(102, 187, 106',
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

    chart: any;

    ngOnInit(): void {
        this.chart = new Chart('HeightChart', this.config);
    }
}
