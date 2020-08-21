import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {
  }

  info(msg: string) {
      this.snackBar.open(msg, 'close', {
        duration: 2500,
        horizontalPosition: 'center',
         panelClass: ['info-notification'],
        verticalPosition: 'top',
      });
    }
    error(msg: string) {
      this.snackBar.open(msg, 'close', {
        duration: 2500,
        horizontalPosition: 'center',
        panelClass: ['error-notification'],
        verticalPosition: 'top',
      });
    }
    success(msg: string) {
      this.snackBar.open(msg, 'close', {
        duration: 2500,
        horizontalPosition: 'center',
         panelClass: ['success-notification'],
        verticalPosition: 'top',
      });
    }
    warning(msg: string) {
      this.snackBar.open(msg, 'close', {
        duration: 2500,
        horizontalPosition: 'center',
         panelClass: ['warning-notification'],
        verticalPosition: 'top',
      });
    }

    private showNotification(m){

    }
   
}