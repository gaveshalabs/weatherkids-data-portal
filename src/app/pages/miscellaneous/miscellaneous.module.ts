import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';

@NgModule({
    imports: [
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        MiscellaneousRoutingModule,
    ],
})
export class MiscellaneousModule {}
