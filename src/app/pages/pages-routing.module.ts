import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivacyPolicyComponent } from '../@components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from '../@components/terms-and-conditions/terms-and-conditions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'weather',
                // loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
                component: HomeComponent,
            },
            {
                path: 'ws',
                loadChildren: () => import('./weather-station-history/weather-station-history.module')
                    .then(m => m.WeatherStationHistoryModule),
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'kite',
                loadChildren: () => import('./kite-competition/kite-competition.module')
                    .then(m => m.KiteCompetitionModule),
            },
            {
                path: 'privacy-policy',
                component: PrivacyPolicyComponent,
            },
            {
                path: 't&c',
                component: TermsAndConditionsComponent,
            },
            {
                path: '',
                redirectTo: 'weather',
                pathMatch: 'full',
            },
            {
                path: '**',
                component: NotFoundComponent,
            },

        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
