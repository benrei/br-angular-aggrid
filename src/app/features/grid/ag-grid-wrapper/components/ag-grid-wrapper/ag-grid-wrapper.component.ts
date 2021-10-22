import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgGridAngular } from 'ag-grid-angular';
import { AgGridContext } from '../../../interfaces/ag-grid-context';

@Component({
  selector: 'app-ag-grid-wrapper',
  templateUrl: './ag-grid-wrapper.component.html',
  styleUrls: ['./ag-grid-wrapper.component.scss']
})
export class AgGridWrapperComponent implements OnInit {
  context: AgGridContext;
  @Input() hasExternalAddButton = false;

  @ContentChild(AgGridAngular) agGrid: AgGridAngular;
  // @ContentChild(AgGridToolbarComponent) toolbar: AgGridToolbarComponent;

  constructor(private snackbar: MatSnackBar) {}

  ngOnInit() {}
  ngAfterContentInit() {
    this.context = this.agGrid.context || this.agGrid.gridOptions.context;
    this.context.hasExternalAddButton = this.hasExternalAddButton;
  }

  addFn = () => {
    this.snackbar.open('AgGridWrapperComponent.addFn()', '', {
      duration: 3000
    });
  };
}
