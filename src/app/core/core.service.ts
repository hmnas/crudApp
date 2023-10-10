import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private matSnack: MatSnackBar) { }

  openSackBar(msg: any, action: string = 'ok') {
    this.matSnack.open(msg, action, {
      duration: 1000,
      verticalPosition: `top`
    })
  }
}
