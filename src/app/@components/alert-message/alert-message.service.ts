import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertMessageComponent } from './alert-message.component';

@Injectable({providedIn: 'root'})
export class AlertMessageService {

  constructor(
    private snackbar: MatSnackBar,
  ) { }

  alertSuccess(message: string) {
    this.snackbar.openFromComponent(AlertMessageComponent, {
      data: {message},
      panelClass: 'alert-success',
      horizontalPosition: 'left',
    });
  }

  alertError(message: string) {
    this.snackbar.openFromComponent(AlertMessageComponent, {
      data: {message},
      panelClass: 'alert-danger',
      horizontalPosition: 'left',
    });
  }
}
