import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'ngx-alert-message',
    templateUrl: './alert-message.component.html',
    styleUrls: ['./alert-message.component.scss'],
    imports: [MatIconModule],
})
export class AlertMessageComponent {

    constructor(
        @Inject(MAT_SNACK_BAR_DATA)
        public data: {message: string},
        public ref: MatSnackBarRef<AlertMessageComponent>,
    ){}
}
