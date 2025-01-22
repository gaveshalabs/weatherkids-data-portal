import { Component } from '@angular/core';
import { NbLayoutColumnComponent, NbLayoutModule } from '@nebular/theme';

@Component({
    selector: 'ngx-weather-portal-layout',
    styleUrls: ['./weather-portal.layout.scss'],
    template: `
    <nb-layout windowMode>
      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
    `,
    imports: [NbLayoutModule]
})
export class WeatherPortalLayoutComponent {}
