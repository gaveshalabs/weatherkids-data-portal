import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from '../@components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from '../@components/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
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
            // {
            //   path: "",
            //   redirectTo: "dashboard",
            //   pathMatch: "full",
            // },
            {
                path: 'privacy-policy',
                component: PrivacyPolicyComponent,
            },
            {
                path: 't&c',
                component: TermsAndConditionsComponent,
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
