import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { NbCardModule } from '@nebular/theme';

Chart.register(...registerables);

@Component({
    selector: 'ngx-heightbarchart',
    standalone: true,
    imports: [RouterOutlet, RouterLink, NbCardModule],
    templateUrl: './district-attempt-barchart.component.html',
    styleUrls: ['./district-attempt-barchart.component.scss'],
})
export class DistrictvsAttemptbarchartComponent implements OnInit {
    public config: any = {
        type: 'bar',
        data: {
            labels : [
                'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha',
                'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala',
                'Mannar', 'Matale', 'Matara', 'Moneragala', 'Mullaitivu', 'Nuwara Eliya',
                'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya',
            ],

            // labels: ['Attempt 1', 'Attempt 2', 'Attempt 3', 'Attempt 4', 'Attempt 5'],
            datasets: [
                {
                    label: 'Attempts',
                    data: [200, 300, 500, 800, 100, 100, 200, 30, 40, 400, 50, 60, 500, 200, 300,
                        500, 800, 100, 100, 200, 300, 400, 400, 50, 60 ],
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
        this.chart = new Chart('DistrictvsAttemptChart', this.config);
    }
}




