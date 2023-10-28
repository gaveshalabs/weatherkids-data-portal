import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbLayoutModule } from '@nebular/theme';
import { OAuth2CallbackComponent } from './oauth2-callback.component';
import { OAuth2Service } from './oauth2.service';
import { HeaderComponent } from '../../@theme/components';

@NgModule({
    declarations: [OAuth2CallbackComponent],
    imports: [CommonModule, NbLayoutModule],
    providers: [OAuth2Service],
    exports: [OAuth2CallbackComponent],
})
export class OAuth2Module {
    // The auth setup for OAuth2 is done in @core/core.module.ts file because of the way the nebular template is structured.
}
