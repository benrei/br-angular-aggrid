import { Component, OnInit } from '@angular/core';
import { AutocompleteStatic } from './../../shared/editors/autocomplete/autocomplete.models';
import { FormControl } from '@angular/forms';
let items = [
  { id: 1, brand: 'Alfa Romeo', extraProp: 'aaa' },
  { id: 2, brand: 'Audi', extraProp: 'bbb' },
  { id: 3, brand: 'BMW', extraProp: 'ccc' },
  { id: 4, brand: 'Fiat ', extraProp: 'ddd' },
  { id: 5, brand: 'Ford', extraProp: 'eee' },
  { id: 6, brand: 'Honda', extraProp: 'fff' },
  { id: 7, brand: 'Jeep', extraProp: 'ggg' },
  { id: 8, brand: 'Nissan', extraProp: 'hhh' },
  { id: 9, brand: 'Porsche', extraProp: 'iii' },
  { id: 10, brand: 'Toyota', extraProp: 'jjj' },
  { id: 11, brand: 'Volkswagen', extraProp: 'kkk' }
];
@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit {
  params: AutocompleteStatic = {
    displayFields: ['brand', 'extraProp'],
    items: items,
    placeholder: 'Brand',
    type: 'static',
    valueField: 'id'
  };
  constructor() {}

  ngOnInit() {}

  onPreProcess = (formControl: FormControl) => {
    console.log('onPreProcess');
    const { value } = formControl;
    const val = this.params.items.find(i => {
      return (
        JSON.stringify(i) &&
        JSON.stringify(i)
          .toLowerCase()
          .includes(value && value.toLowerCase())
      );
    });
    formControl.setValue(val);
  };
}
