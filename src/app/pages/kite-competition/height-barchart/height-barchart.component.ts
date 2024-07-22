import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Chart, registerables} from 'chart.js';
import { NbCardModule } from '@nebular/theme';

Chart.register(...registerables);
@Component({
    selector: 'ngx-heightbarchart',
    standalone: true,
    imports: [RouterOutlet, RouterLink, NbCardModule],
    templateUrl: './height-barchart.component.html',
    styleUrls: ['./height-barchart.component.scss'],
})

export class HeightbarchartComponent implements OnInit{
    public config: any = {
        type: 'bar',

        data: {
            labels: ['Attempt 1', 'Attempt 2', 'Attempt 3', 'Attempt 4', 'Attempt 5'],
            datasets: [
                {
                    label: 'Height(m)',
                    data: ['200', '300', '500', '800', '100'],
                    backgroundColor: [
                        'blue',
                    ],
                },

                {
                    label: 'Time(S)',
                    data: ['50', '100', '50', '80', '200'],
                    backgroundColor: 'red',
                },

            ],
        },
        options: {
            aspectRatio: 1,
        },
    };
    chart: any;
    ngOnInit(): void{
        this.chart = new Chart('HeightChart', this.config);
    }
}
