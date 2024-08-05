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










// /**
//  * @license
//  * Copyright Akveo. All Rights Reserved.
//  * Licensed under the MIT License. See License.txt in the project root for license information.
//  */
// import { Component, OnInit } from '@angular/core';
// import packageJson from '../../package.json';
// import { AnalyticsService } from './@core/utils/analytics.service';
// import { SeoService } from './@core/utils/seo.service';
// import { Router, NavigationEnd } from '@angular/router';
// import { ThemeService } from './@core/services/theme.service'; // Adjust the path if necessary

// @Component({
//   selector: 'ngx-app',
//   template: `
//     <ngx-loader></ngx-loader>
//     <router-outlet></router-outlet>
//   `,
// })
// export class AppComponent implements OnInit {
//   constructor(
//     private analytics: AnalyticsService,
//     private seoService: SeoService,
//     private router: Router,
//     private themeService: ThemeService // Inject the ThemeService
//   ) {}

//   ngOnInit(): void {
//     this.analytics.trackPageViews();
//     this.seoService.trackCanonicalChanges();
//     console.info(`v${packageJson.version}`);

//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.applyThemeBasedOnRoute(event.urlAfterRedirects);
//       }
//     });
//   }

//   applyThemeBasedOnRoute(url: string) {
//     if (url.startsWith('/kite')) {
//       this.themeService.setTheme('dark');
//       // this.themeService.setTheme('material-dark'); // Dark theme for /kite route
//     }
//     else {
//       this.themeService.setTheme('default'); // Default theme for other routes
//     }
//   }
// }



import { Component, OnInit, Renderer2 } from '@angular/core';
import packageJson from '../../package.json';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { Router, NavigationEnd } from '@angular/router';
import { ThemeService } from './@core/services/theme.service';

@Component({
    selector: 'ngx-app',
    template: `
    <ngx-loader></ngx-loader>
    <router-outlet></router-outlet>
  `,
    styles: [`
    :host {
      display: block;
    }
  `],
})
export class AppComponent implements OnInit {
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

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.applyThemeBasedOnRoute(event.urlAfterRedirects);
            }
        });
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
