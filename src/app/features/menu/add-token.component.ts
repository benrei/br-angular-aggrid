import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: "app-add-token",
  template: `
    <div mat-dialog-content>
      <p>Paste a valid token..</p>
      <textarea placeholder="eyXxxxx..." #textarea></textarea>
    </div>
    <div mat-dialog-actions>
      <button (click)="onClick(textarea.value)" mat-dialog-close>
        Set token
      </button>
    </div>
  `,
  styles: ["textarea{width:100%}"]
})
export class AddTokenComponent {
  localStorage = window.localStorage;
  constructor(public dialogRef: MatDialogRef<AddTokenComponent>) {}
  onClick(token) {
    localStorage.setItem("token", token);
    this.dialogRef.close();
  }
}
