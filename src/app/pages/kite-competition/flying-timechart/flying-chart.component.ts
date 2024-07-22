import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { NbCardModule } from '@nebular/theme';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);
@Component({
    selector: 'ngx-flyingchart',
    standalone: true,
    imports: [RouterOutlet, RouterLink, NbCardModule],
    templateUrl: './flying-chart.component.html',
    styleUrls: ['./flying-chart.component.scss'],
})

export class FlyingchartComponent implements OnInit{
    public config: any = {
        type: 'doughnut',

        data: {
            labels: ['Total Flying Hours', 'Peak Flying Hours'],
            datasets: [
                {
                    labels: ['Total Flying Hours(h)', 'Peak Flying Hours(h)'],
                    data: ['70', '20'],
                    backgroundColor: [
                        'purple',
                        'yellow',
                    ],
                },

            ],
        },
        options: {
            aspectRatio: 1.1,
            cutout: '70%',
        },
    };
    chart: any;
    ngOnInit(): void{
        this.chart = new Chart('FlyingChart', this.config);
    }
}
