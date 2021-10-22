import { Component, Input, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Events, GridReadyEvent } from 'ag-grid-community';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-ag-grid-filter-panel',
  templateUrl: './ag-grid-filter-panel.component.html',
  styleUrls: ['./ag-grid-filter-panel.component.scss'],
})
export class AgGridFilterPanelComponent implements OnInit {
  @Input() agGrid: AgGridAngular;
  @Input() filters: FilterItem[];
  selectedFilterItem: FilterItem;
  constructor() {}

  ngOnInit(): void {
    this.listenToFilterChanges();
  }

  listenToFilterChanges() {
    this.agGrid?.gridReady.pipe(take(1)).subscribe(
      ({ api }: GridReadyEvent) => {
        api.addEventListener(Events.EVENT_FILTER_CHANGED, () => {
          const model = JSON.stringify(api.getFilterModel()).toLowerCase();
          const foundFilter = this.filters.find((f) =>
            model.includes(JSON.stringify(f.filterModel)?.toLowerCase())
          );
          if (foundFilter) {
            this.selectedFilterItem = foundFilter;
          } else {
            this.selectedFilterItem = this.filters[0];
          }
        });
      }
    );
  }

  setFilter(filter: FilterItem) {
    let filterModel = {
      ...this.agGrid.api.getFilterModel(),
      ...filter.filterModel,
    };
    if (this.selectedFilterItem?.filterModel) {
      Object.keys(this.selectedFilterItem?.filterModel).forEach((key) => {
        delete filterModel[key];
      });
    }
    this.agGrid.api.setFilterModel(filterModel);
    // this.agGrid.api.deselectAll()
    this.selectedFilterItem = filter;
  }
}
export interface FilterItem {
  title: string;
  // field?: string;
  filterModel?: { [key: string]: Filter };
}

export interface Filter {
  filter: string;
  filterType: string;
  // operator?: string;
  type: string;
}
