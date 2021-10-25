import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AgGridContext } from '../../../interfaces/ag-grid-context';

@Component({
  selector: 'app-ag-grid-wrapper',
  templateUrl: './ag-grid-wrapper.component.html',
  styleUrls: ['./ag-grid-wrapper.component.scss'],
})
export class AgGridWrapperComponent implements OnInit {
  context: AgGridContext;

  @ContentChild(AgGridAngular) agGrid: AgGridAngular;
  // @ContentChild(AgGridToolbarComponent) toolbar: AgGridToolbarComponent;

  ngOnInit() {}
  ngAfterContentInit() {
    this.context = this.agGrid.context || this.agGrid.gridOptions.context;
  }
}
