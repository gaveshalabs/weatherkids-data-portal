import {
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NbAuthModule,
    NbDummyAuthStrategy,
    NbOAuth2AuthStrategy,
    NbOAuth2ResponseType,
} from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
    AnalyticsService,
    LayoutService,
    PlayerService,
    SeoService,
    StateService,
} from './utils';
import { TemperatureHumidityData } from './data/temperature-humidity';

import { TemperatureHumidityService } from './mock/temperature-humidity.service';
import { MockDataModule } from './mock/mock-data.module';
import { environment } from '../../environments/environment';

const socialLinks = [
    {
        url: 'https://github.com/akveo/nebular',
        target: '_blank',
        icon: 'github',
    },
    {
        url: 'https://www.facebook.com/akveo/',
        target: '_blank',
        icon: 'facebook',
    },
    {
        url: 'https://twitter.com/akveo_inc',
        target: '_blank',
        icon: 'twitter',
    },
];

const DATA_SERVICES = [
    { provide: TemperatureHumidityData, useClass: TemperatureHumidityService },

];

export class NbSimpleRoleProvider extends NbRoleProvider {
    getRole() {
        // here you could provide any role based on any auth flow
        return observableOf('guest');
    }
}

export const NB_CORE_PROVIDERS = [
    ...MockDataModule.forRoot().providers,
    ...DATA_SERVICES,
    ...NbAuthModule.forRoot({
        strategies: [
            NbDummyAuthStrategy.setup({
                name: 'email',
                delay: 3000,
            }),
            // NbOAuth2AuthStrategy.setup({
            //     name: 'google',
            //     clientId: environment.googleWebClientId,
            //     authorize: {
            //         endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            //         responseType: NbOAuth2ResponseType.TOKEN,
            //         scope: 'profile email',
            //         redirectUri: environment.googleRedirectUri,
            //     },
            // }),
        ],
        forms: {
            login: {
                socialLinks: socialLinks,
            },
            register: {
                socialLinks: socialLinks,
            },
        },
    }).providers,

    NbSecurityModule.forRoot({
        accessControl: {
            guest: {
                view: '*',
            },
            user: {
                parent: 'guest',
                create: '*',
                edit: '*',
                remove: '*',
            },
        },
    }).providers,

    {
        provide: NbRoleProvider,
        useClass: NbSimpleRoleProvider,
    },
    AnalyticsService,
    LayoutService,
    PlayerService,
    SeoService,
    StateService,
];

@NgModule({
    imports: [CommonModule],
    exports: [NbAuthModule],
    declarations: [],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [...NB_CORE_PROVIDERS],
        };
    }
}
