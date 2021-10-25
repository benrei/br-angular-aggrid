import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ag-grid-page',
  templateUrl: './ag-grid.page.html',
  styleUrls: ['./ag-grid.page.css'],
})
export class AgGridPage implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
