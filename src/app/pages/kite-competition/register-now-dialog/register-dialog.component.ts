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
    // Handle registration logic here
    // For example, you can close the dialog after registration
        this.dialogRef.close();
    }
}
