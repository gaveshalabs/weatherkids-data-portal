import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
    selector: 'ngx-playerattemptchart',
    styleUrls: ['./player-attempt-chart.component.scss'],
    templateUrl: './player-attempt-chart.component.html',
})
export class PlayerAttemptChartComponent implements AfterViewInit {

    panelOpenState: boolean = false;

    // Sample data for the chart
    private readonly chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Attempts',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        }],
    };

    constructor() {
    // Register Chart.js components
        Chart.register(...registerables);
    }

    ngAfterViewInit() {
    // Initialize chart after view is initialized
        this.createChart();
    }

    createChart() {
        const ctx = (document.getElementById('lineChart') as HTMLCanvasElement).getContext('2d');
        if (ctx) {
            new Chart(ctx, {
                type: 'line', // Explicitly set the type
                data: this.chartData, // Use the local data
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }
}



// import { Component, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
// import { Chart, registerables } from 'chart.js';
// import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';

// @Component({
//   selector: 'ngx-playerattemptchart',
//   styleUrls: ['./player-attempt-chart.component.scss'],
//   templateUrl: './player-attempt-chart.component.html',
// })
// export class PlayerAttemptChartComponent implements AfterViewInit, OnChanges {
//   @Input() chartData: TotalKiteData[]; // Input data for the chart
//   @Input() panelOpenState: boolean = false;

//   private chart: Chart | undefined;

//   constructor() {
//     // Register Chart.js components
//     Chart.register(...registerables);
//   }

//   ngAfterViewInit() {
//     // Initialize chart after view is initialized
//     this.createChart();
//   }

//   ngOnChanges(changes: SimpleChanges) {
//     // Update chart if input data changes
//     if (changes['chartData'] && this.chart) {
//       this.updateChart();
//     }
//   }

//   createChart() {
//     const ctx = (document.getElementById('lineChart') as HTMLCanvasElement).getContext('2d');
//     if (ctx) {
//       this.chart = new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: this.getLabels(),
//           datasets: [{
//             label: 'Attempts',
//             data: this.getData(),
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1
//           }]
//         },
//         options: {
//           responsive: true,
//           scales: {
//             x: {
//               beginAtZero: true
//             },
//             y: {
//               beginAtZero: true
//             }
//           }
//         }
//       });
//     }
//   }

//   updateChart() {
//     if (this.chart) {
//       this.chart.data.labels = this.getLabels();
//       this.chart.data.datasets[0].data = this.getData();
//       this.chart.update();
//     }
//   }

//   private getLabels(): string[] {
//     // Extract and return labels from the input data
//     return this.chartData.map(data => data.label); // Adjust this based on your data structure
//   }

//   private getData(): number[] {
//     // Extract and return data values from the input data
//     return this.chartData.map(data => data.value); // Adjust this based on your data structure
//   }
// }
