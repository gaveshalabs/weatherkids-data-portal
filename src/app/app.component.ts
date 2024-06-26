 /**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import packageJson from '../../package.json';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { RegisterNowComponent } from './pages/kite-competition/register-now-dialog/register-dialog.component';

@Component({
    selector: 'ngx-app',
    template: `
    <ngx-loader></ngx-loader>
    <router-outlet></router-outlet>
    `,
})
export class AppComponent implements OnInit {
    constructor(
        private analytics: AnalyticsService,
        private seoService: SeoService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.analytics.trackPageViews();
        this.seoService.trackCanonicalChanges();
        console.info(`v${packageJson.version}`);
    }

    openDialog(){

      this.dialog.open(RegisterNowComponent);
    }
}
