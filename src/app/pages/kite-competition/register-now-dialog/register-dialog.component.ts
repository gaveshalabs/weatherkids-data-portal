import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'ngx-register-now',
    templateUrl: './register-dialog.component.html',
    styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterNowComponent implements OnInit {

    constructor(private dialogRef: MatDialogRef<RegisterNowComponent>) { }

    ngOnInit(): void {
    }

    registerNow(): void {
        this.dialogRef.close();
    }
}
