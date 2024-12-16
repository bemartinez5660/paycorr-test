import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from '@angular/material/dialog';
import {NotificationModalComponent} from '../components/notification-modal/notification-modal.component';

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) { }

  success(message: string = "success"): void {
    this.showSuccessNotification(message);
  }

  error(message: string): void {
    if (!message || message.length === 0) {
      this.showErrorNotification(message);
    } else {
      this.showErrorNotification(message);
    }
  }

  notificationComponent(componentNotification: any, durationMilliseconds: number = 0) {
    this._snackBar.openFromComponent(componentNotification, {
      duration: durationMilliseconds,
      verticalPosition: 'top'
    });
  }

  private showErrorNotification(message: string) {
    this._snackBar.open(message, "Ok", {
      duration: 5000,
      panelClass: "error-notification-snackbar",
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  private showSuccessNotification(message: string) {
    this._snackBar.open(message, "Ok", {
      duration: 5000,
      panelClass: "success-notification-snackbar",
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  showAndSubscribe(msg: string, btn_ok_text: string, btn_cancel_txt?: string, disableClose: boolean = false, redirect?: string, isCloseAll: boolean = false) {
    if (isCloseAll) {
      this._dialog.closeAll();
    }
    return this._dialog.open(NotificationModalComponent, {
      disableClose: disableClose,
      width: 'auto',
      data: {
        msg: msg,
        btn_ok_text: btn_ok_text,
        btn_cancel_txt: btn_cancel_txt,
        redirect: redirect,
        disableClose
      },
    })
  }

}
