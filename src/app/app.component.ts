// /**
//  * @license
//  * Copyright Akveo. All Rights Reserved.
//  * Licensed under the MIT License. See License.txt in the project root for license information.
//  */
// import { Component, OnInit } from '@angular/core';
// import packageJson from '../../package.json';
// import { AnalyticsService } from './@core/utils/analytics.service';
// import { SeoService } from './@core/utils/seo.service';

// @Component({
//     selector: 'ngx-app',
//     template: `
//     <ngx-loader></ngx-loader>
//     <router-outlet></router-outlet>
//     `,
// })
// export class AppComponent implements OnInit {
//     constructor(
//         private analytics: AnalyticsService,
//         private seoService: SeoService,
//     ) {}

//     ngOnInit(): void {
//         this.analytics.trackPageViews();
//         this.seoService.trackCanonicalChanges();
//         console.info(`v${packageJson.version}`);
//     }

// }




import { Component, OnInit, Renderer2 } from '@angular/core';
import packageJson from '../../package.json';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import {
    Router, NavigationEnd, NavigationStart, NavigationCancel,
    NavigationError, Event as RouterEvent } from '@angular/router';
import { ThemeService } from './@core/services/theme.service';

@Component({
    selector: 'ngx-app',
    template: `
    <ngx-loader></ngx-loader>
    <ngx-loading-spinner *ngIf="loading" ></ngx-loading-spinner>
    <router-outlet *ngIf="!loading"></router-outlet>
  `,
    styles: [`
    :host {
      display: block;
    }
  `],
})
export class AppComponent implements OnInit {
    loading = true;
    constructor(
        private analytics: AnalyticsService,
        private seoService: SeoService,
        private router: Router,
        private themeService: ThemeService,
        private renderer: Renderer2 // Inject Renderer2
    ) {}

    ngOnInit(): void {

        this.analytics.trackPageViews();
        this.seoService.trackCanonicalChanges();
        console.info(`v${packageJson.version}`);

        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof NavigationStart) {
                this.showSpinner();
            } else if (event instanceof NavigationEnd) {
                this.hideSpinnerWithDelay();
                this.applyThemeBasedOnRoute(event.urlAfterRedirects);
            } else if (event instanceof NavigationCancel || event instanceof NavigationError) {
                this.hideSpinnerWithDelay();
            }
        });


        // this.analytics.trackPageViews();
        // this.seoService.trackCanonicalChanges();
        // console.info(`v${packageJson.version}`);

        // this.router.events.subscribe(event => {
        //     if (event instanceof NavigationEnd) {
        //         this.applyThemeBasedOnRoute(event.urlAfterRedirects);
        //     }
        // });
    }

    // Method to show the loading spinner
    showSpinner(): void {
        this.loading = true;
    }

    // Method to hide the spinner with a slight delay (optional)
    hideSpinnerWithDelay(delay: number = 1000): void {
        setTimeout(() => {
            this.loading = false;
        }, delay);
    }


    applyThemeBasedOnRoute(url: string) {
        const body = document.body;
        if (url.startsWith('/kite')) {
            this.renderer.removeClass(body, 'clownfish-theme');
            this.renderer.addClass(body, 'purple-green-theme');
            this.themeService.setTheme('purple-green'); // Set Nebular dark theme
        } else {
            this.renderer.removeClass(body, 'purple-green-theme');
            this.renderer.addClass(body, 'clownfish-theme');
            this.themeService.setTheme('clownfish'); // Set Nebular default theme
        }
    }
}
