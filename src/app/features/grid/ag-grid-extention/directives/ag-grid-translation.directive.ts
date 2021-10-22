import { MatSnackBar } from '@angular/material/snack-bar';
import { AfterViewInit, Directive, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ColGroupDef } from 'ag-grid-community';

@Directive({
  selector: 'ag-grid-angular[translate]',
})
export class AgGridTranslationDirective implements OnInit, AfterViewInit {
  constructor(private agGrid: AgGridAngular, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.snackBar.open('TODO: add a translateService');
    this.agGrid.localeTextFunc = (key: string, defaultValue: string) => {
      const gridKey = 'Grid.' + key;
      // return this.translateService.instant(gridKey);
      return defaultValue;
    };
  }

  ngAfterViewInit(): void {
    const colDefs = this.agGrid.api.getColumnDefs();
    this.translate(colDefs);
    this.agGrid.api.setColumnDefs(colDefs);
  }

  private translate = (colDefs: (ColDef | ColGroupDef)[]) => {
    colDefs.forEach((colDef: ColDef & ColGroupDef) => {
      if (colDef.children) {
        // Translate children, see: https://www.ag-grid.com/angular-data-grid/column-groups/
        this.translate(colDef.children);
      }
      if (colDef.headerName) {
        // colDef.headerName = this.translateService.instant(colDef.headerName);
      }
    });
  };
}
