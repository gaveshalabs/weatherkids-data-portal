/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    // NbChatModule,
    // NbDatepickerModule,
    // NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbToastrModule,
    NbWindowModule,
} from '@nebular/theme';
import { MapComponent } from './@components/map/map.component';
import { PrivacyPolicyComponent } from './@components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './@components/terms-and-conditions/terms-and-conditions.component';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OAuth2Module } from './modules/oauth2/oauth2.module';
import { HomeComponent } from './pages/home/home.component';
import { ApiModule } from './api/api.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MapComponent,
        PrivacyPolicyComponent,
        TermsAndConditionsComponent,
    ],
    imports: [
        ApiModule,

        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        // NbDatepickerModule.forRoot(),
        // NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        // NbChatModule.forRoot({
        //   messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
        // }),
        CoreModule.forRoot(),
        ThemeModule.forRoot(),

        OAuth2Module,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
