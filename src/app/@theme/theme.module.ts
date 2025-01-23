import { ModuleWithProviders, NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';
import {
    NbActionsModule,
    NbContextMenuModule,
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    NbThemeModule,
    NbUserModule,
} from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


const palette = {
    primary: '#1976d2',
    secondary: '#d27619',
    success: '#89BF0B',
    info: '#00D9ED',
    warning: '#F2A100',
    danger: '#FF381E',
};
const APP_THEME: NbJSThemeOptions = {
    name: 'clownfish',  // dark blue and dark orange
    base: 'default',
    variables: {
        fontMain: 'Outfit, Noto Sans Sinhala, sans-serif',
        fontSecondary: 'Outfit, Noto Sans Sinhala, sans-serif',

        bg: '#ffffff',
        bg2: '#f5f5f5',
        bg3: '#ebebeb',
        bg4: '#e0e0e0',

        border: '#ffffff',
        border2: '#f5f5f5',
        border3: '#ebebeb',
        border4: '#e0e0e0',
        border5: '#b3b3b3',

        fg: '#838383',
        fgHeading: '#1a2138',
        fgText: '#1a2138',
        fgHighlight: palette.primary,
        layoutBg: '#ebebeb',
        separator: '#ebebeb',

        primary: palette.primary,
        secondary: palette.secondary,
        success: palette.success,
        info: palette.info,
        warning: palette.warning,
        danger: palette.danger,

        primaryLight: '#63a4ff',
        // successLight: '#9FDA66',
        // infoLight: '#59C7DD',
        // warningLight: '#EBBC5E',
        // dangerLight: '#DF6B6A',

        primaryDark: '#004ba0',
    },
};

const NB_MODULES = [
    NbLayoutModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
    NbSidebarModule,
    NbContextMenuModule,
    NbSecurityModule,
    NbEvaIconsModule,
    // MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,

];

@NgModule({
    imports: [
        ...NB_MODULES,
    ],
})
export class ThemeModule {
    static forRoot(): ModuleWithProviders<ThemeModule> {
        return {
            ngModule: ThemeModule,
            providers: NbThemeModule.forRoot({ name: 'clownfish' }, [APP_THEME]).providers,
        };
    }
}
