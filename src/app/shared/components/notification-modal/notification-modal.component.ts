import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-notification-modal',
  standalone: false,

  templateUrl: './notification-modal.component.html',
  styleUrl: './notification-modal.component.css'
})
export class NotificationModalComponent implements OnInit {
  msg: string;
  btn_ok_text: string;
  btn_cancel_txt: string;
  redirect: string;
  disableClose: boolean;

  constructor(
    private _dialogRef: MatDialogRef<NotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.msg = data.msg;
    this.btn_ok_text = data && data.btn_ok_text ? data?.btn_ok_text : 'OK';
    this.btn_cancel_txt = data && data.btn_cancel_txt ? data.btn_cancel_txt : undefined;
    this.redirect = data && data.redirect ? data.redirect : undefined;
    this.disableClose = data.disableClose
  }

  ngOnInit(): void {
  }

  close(withAction?: boolean) {
      this._dialogRef.close(withAction);
  }


}
