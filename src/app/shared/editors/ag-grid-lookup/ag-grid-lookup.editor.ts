import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditorBase } from '../editor.base';
import { AgGridLookupEditorParams } from './ag-grid-lookup.models';
import { AgGridDialogComponent } from './components/ag-grid-dialog/ag-grid-dialog.component';

@Component({
  selector: 'app-ag-grid-lookup',
  template: `
    <input
      #input
      [formControl]="control"
      [matTooltip]="tooltip"
      [placeholder]="placeholder"
      [style.background]="control.errors ? '#f3c8c7' : 'none'"
      (keydown)="onKeyDown($event)"
    />
  `,
  styles: [
    'input {height: 100%; width:100%; padding: 0 11px; box-sizing: border-box;}',
  ],
})
export class AgGridLookupEditor extends EditorBase implements OnInit {
  @Input() control: FormControl;
  @Input() params: AgGridLookupEditorParams;

  @ViewChild('input', { read: ViewContainerRef }) input: ViewContainerRef;
  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit() {}

  onKeyDown(event: KeyboardEvent) {
    const { key } = event;
    switch (key) {
      case 'F2':
        event.preventDefault();
        console.log('yay');
        this.openDialog();
        break;
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(AgGridDialogComponent, {
      height: '500px',
      width: '700px',
      data: { ...this.params },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result[this.params.valueField]);
        this.control.setValue(result[this.params.valueField]);
        this.control.markAsDirty();
      }
    });
  }
}
