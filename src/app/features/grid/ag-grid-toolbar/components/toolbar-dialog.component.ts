import { OnInit, Inject, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ElementBase } from '../element-mappers/element.base';

@Component({
  selector: 'app-form-dialog',
  template: `
    <h1>Form data</h1>
    <pre>{{ data.text }}</pre>
    <form *ngIf="formGroup" [formGroup]="formGroup"></form>
    <button (click)="onBtnClick()">Console log form</button>
  `
})
export class ToolbarDialogComponent implements OnInit {
  settings;
  elements: ElementBase[] = [];
  formGroup: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit() {
    this.formGroup = this.data.formGroup;
    this.elements = this.data.elements;
  }
  onBtnClick() {
    console.log(this.formGroup.value);
  }
}
