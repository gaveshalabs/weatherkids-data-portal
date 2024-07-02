/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import packageJson from '../../package.json';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';

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
    ) {}

    ngOnInit(): void {
        this.analytics.trackPageViews();
        this.seoService.trackCanonicalChanges();
        console.info(`v${packageJson.version}`);
    }

}
