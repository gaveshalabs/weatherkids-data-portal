import { Component } from '@angular/core';

@Component({
    selector: 'ngx-weather-portal-layout',
    styleUrls: ['./weather-portal.layout.scss'],
    template: `
    <nb-layout>
      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
    `,
})
export class WeatherPortalLayoutComponent {}
