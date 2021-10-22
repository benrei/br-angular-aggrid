import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  Subject
} from 'rxjs';
import {
  AutocompleteDatasourceService,
  AutocompleteRequest
} from './autocomplete-datasource.service';
import {
  AutocompleteEditorParams,
  AutocompleteStatic
} from './autocomplete.models';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { EditorBase } from '../editor.base';

@Component({
  selector: 'app-autocomplete-editor',
  templateUrl: './autocomplete.editor.html',
  styleUrls: ['./autocomplete.editor.css']
})
export class AutocompleteEditor extends EditorBase implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() params: AutocompleteEditorParams;
  @Input() preProcess: (formControl: FormControl) => void;
  allDataLoaded = false;
  itemsCountChanged$ = new Subject<number>();
  lastRow: number;
  loading = false;
  request: AutocompleteRequest;
  startRow = 0;
  totalCount: number;
  debounce = 150;
  items: any[] = [];
  filteredItems$: Observable<any[]>;
  autoActiveFirstOption = () =>
    typeof this.control.value === 'string' || !this.control.value;

  @ViewChild('input', { read: ViewContainerRef }) input: ViewContainerRef;
  @ViewChild('trigger') autocompleteTrigger: MatAutocompleteTrigger;

  constructor(private datasource: AutocompleteDatasourceService) {
    super();
  }

  ngOnInit() {}
  onBtnClick(event: Event, trigger: MatAutocompleteTrigger) {
    event.stopPropagation();
    this.init();
    trigger.openPanel();
    this.input.element.nativeElement.focus();
  }
  onBlur() {
    console.log('onBlur');
    const { value } = this.control;
    this.items = [];
    if (typeof value === 'string') {
      this.preProcess(this.control);
    }
  }

  filter = val => {
    const filter = typeof val === 'string' ? val : '';
    return this.items.filter(item =>
      JSON.stringify(item)
        .toLowerCase()
        .includes(filter.toLowerCase())
    );
  };

  init() {
    let valueChanges$ = this.control.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(this.debounce)
    );
    switch (this.params.type || 'static') {
      case 'static':
        const { items } = this.params as AutocompleteStatic;
        this.items = items;
        setTimeout(() => this.itemsCountChanged$.next(this.items.length));
        break;
      case 'datasource':
        this.getItemsFromDatasource();
        valueChanges$.subscribe(val => {
          const isSearch = typeof val === 'string';
          if (isSearch) this.getItemsFromDatasource();
        });
        break;
      case 'external':
        // TODO: implement
        break;
    }
    this.filteredItems$ = combineLatest([
      valueChanges$.pipe(startWith('')),
      this.itemsCountChanged$
    ]).pipe(map(([val$, b$]) => this.filter(val$)));
  }

  getItemsFromDatasource() {
    if (this.allDataLoaded) return;
    this.request = this.request || new AutocompleteRequest(this.params);
    const req = this.request;
    const { value } = this.control;
    const searchText = typeof value === 'string' ? value : '';
    let overrideItems = false;
    if (req.gridSearch && searchText.startsWith(req.gridSearch)) {
      if (this.lastRow > 0) {
        return; // We have all data needed locally..
      }
    } else if (req.gridSearch !== searchText) {
      req.gridSearch = searchText;
      this.startRow = 0;
      overrideItems = true;
    }
    if (req.storeType === 'partial') {
      req.startRow = this.startRow;
      req.endRow = this.startRow + req.cacheBlockSize;
      this.startRow += req.cacheBlockSize;
    }
    this.loading = true;
    this.datasource.getRows(req).subscribe((result: any) => {
      const { data, lastRow, totalCount } = result;
      this.lastRow = lastRow;
      this.allDataLoaded = !req.gridSearch && lastRow === totalCount;
      this.totalCount = totalCount;
      if (overrideItems) {
        this.items = data;
      } else {
        this.items.push(...data);
      }
      this.itemsCountChanged$.next(this.items.length);
      this.loading = false;
    });
  }

  displayWith = item => {
    const { displayFields, valueField } = this.params;
    if (!item) return;
    switch (typeof item) {
      case 'object':
        return displayFields
          ? displayFields.map(l => item[l]).join(' - ')
          : item && item[valueField];
      case 'string':
        return item;
    }
  };

  getOptionLabel(item: any) {
    if (!item) return null;
    const { value } = this.control;
    const { displayFields, valueField } = this.params;
    switch (typeof item) {
      case 'object':
        let option;
        if (displayFields) {
          if (typeof value === 'string') {
            let label = displayFields.map(l => item[l]).join(' - ');
            option = label.replace(new RegExp(`(${value})`, 'ig'), '<b>$1</b>');
          } else option = displayFields.map(d => item[d]).join(' - ');
        } else {
          option = item && item[valueField];
        }
        return option;
      case 'string':
        return item;
    }
  }

  onKeyup = (event: KeyboardEvent, trigger: MatAutocompleteTrigger) => {
    if (event.key === 'F2') {
      event.stopPropagation();
      trigger.openPanel();
      this.init();
      this.input.element.nativeElement.focus();
    }
  };

  onScroll = () => {
    if (this.params.type === 'datasource' && !this.loading) {
      this.getItemsFromDatasource();
    }
  };

  onOptionSelected = () => {};
}
