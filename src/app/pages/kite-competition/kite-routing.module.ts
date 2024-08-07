import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KiteComponent } from './kite/kite.component';
import { FlyingchartComponent } from './flying-timechart/flying-chart.component';
import { AirtimeRecordComponent } from './airtime-record/airtime-record.component';
import { kitedetailsComponent } from './kite-detailscard/kite-detailscard.component';
import { HeightComparisonComponent } from './height-comparison/height-comparison.component';
import { KiteDashboardComponent } from './kite-dashboard/kite-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: KiteComponent,
        children: [
            {
                path: '',
                redirectTo: 'player/all',
                pathMatch: 'full',
            },
            {
                path: 'player',
                children: [
                    { path: ':id', component: KiteDashboardComponent},
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class KiteRoutingModule { }
