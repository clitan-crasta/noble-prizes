import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * Class ToastService
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  private defaultConfig: MatSnackBarConfig = {
    duration: 3000, 
    horizontalPosition: 'left',
    verticalPosition: 'bottom',
  };

  success(message: string, action: string = 'OK') {
    this.open(message, action, ['toast-success']);
  }

  warning(message: string, action: string = 'OK') {
    this.open(message, action, ['toast-warning']);
  }

  error(message: string, action: string = 'Dismiss') {
    this.open(message, action, ['toast-error']);
  }

  info(message: string, action: string = 'OK') {
    this.open(message, action, ['toast-info']);
  }

  private open(message: string, action: string, panelClass: string[]) {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      panelClass,
    });
  }
}
