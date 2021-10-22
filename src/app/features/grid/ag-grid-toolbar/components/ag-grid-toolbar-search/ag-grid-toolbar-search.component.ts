import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Events, GridApi, GridReadyEvent } from 'ag-grid-community';

import { AgGridAngular } from 'ag-grid-angular';
import { take } from 'rxjs/operators';
let timer;

@Component({
  selector: 'app-ag-grid-toolbar-search',
  templateUrl: './ag-grid-toolbar-search.component.html',
  styleUrls: ['./ag-grid-toolbar-search.component.scss']
})
export class AgGridToolbarSearchComponent implements OnInit {
  @Input() agGrid: AgGridAngular;
  @Input() debounceSearch = 500;
  gridApi: GridApi;
  clearFilterBtnVisible = false;
  @ViewChild('seachInput', { static: true }) seachInput: ElementRef;

  constructor(
  ) { }

  ngOnInit(): void {
    this.agGrid?.gridReady.pipe(take(1)).subscribe(
      (event: GridReadyEvent) => {
        this.gridApi = event.api;
        this.listenToFilterChanges();
      }
    );
  }
  onSearch({ target }) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const type = this.gridApi.getModel().getType();
      switch(type){
        case 'clientSide':
        this.gridApi.setQuickFilter(target.value);
        break;
        case 'serverSide':
          // this.datasourceScService.globalFilter = target.value;
          // this.gridApi.onFilterChanged();
        break;
      }
    }, this.debounceSearch);
  }
  
  listenToFilterChanges() {
    this.gridApi.addEventListener(Events.EVENT_FILTER_CHANGED, () => {
      this.clearFilterBtnVisible = this.gridApi.isAnyFilterPresent()
        // this.gridApi.isAnyFilterPresent() || !!this.datasourceScService.globalFilter;
    });
  }

  clearFilters() {
    this.seachInput.nativeElement.value = null;
    // this.datasourceScService.globalFilter = null;
    this.gridApi.setQuickFilter(null);
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
  }
}
