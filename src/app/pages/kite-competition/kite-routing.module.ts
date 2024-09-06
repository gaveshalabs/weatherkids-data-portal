import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KiteComponent } from './kite/kite.component';
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
