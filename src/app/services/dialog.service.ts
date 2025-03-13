import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'; // Import MatSnackBar
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private notification: MatSnackBar) { }
  isLoading = new BehaviorSubject<boolean>(false);
  // show(){
  //   this.isLoading.next(true);
  // }
  show() {
    this.isLoading.next(true);
    // setTimeout(() => {
    //   this.isLoading.next(false); // Use next(false) instead of assigning directly
    // }, 1000); // Ensures the spinner is visible for at least 500ms
  }
  hide(){
    this.isLoading.next(false);
  }

  static setConfigurations(type: string, position: string, notify_duration: number) {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    let verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    const duration: number = notify_duration;

    const extraClasses: Array<string> = [];
    // assign classes regarding success and error
    if (type !== undefined) {
      if (type.toLowerCase() === 'error') {
        extraClasses.push('nad-notify-error');
      } else if (type.toLowerCase() === 'success') {
        extraClasses.push('nad-notify-success');
      }
    }

    // assign position to notification bar
    if (position.toLowerCase() === 'bottom') {
      verticalPosition = 'bottom';
    } else {
      verticalPosition = 'top';
    }

    const config = new MatSnackBarConfig();
    config.verticalPosition = verticalPosition;
    config.horizontalPosition = horizontalPosition;
    // config.duration = duration ? duration : 3000;
    config.duration = 3000;
    // vedant - update as per angular material 6
    config.panelClass = extraClasses.length > 0 ? extraClasses : undefined;
    return config;
  }

  showNotification(message: string = 'Error Message', type: string, position: string = 'top', duration: number) {
    const config = DialogService.setConfigurations(type, position, 3000);
    this.notification.open(message, 'X', config);
  }

}

