import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTokenComponent } from './add-token.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  menuItems = [
    { title: 'Home', path: '' },
    { title: 'Other', path: 'other' },
    { title: 'AgGrid server side', path: 'ag-grid-server-side' },
    { title: 'AgGrid', path: 'ag-grid' },
  ];
  constructor(public dialog: MatDialog) {}

  onAddTokenBtn() {
    this.dialog.open(AddTokenComponent, {
      width: '550px',
    });
  }
}
