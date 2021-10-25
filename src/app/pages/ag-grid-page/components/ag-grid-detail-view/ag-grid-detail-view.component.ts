import { NavLink } from './../../../../features/tab-navigation/nav-link';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ag-grid-detail-view',
  templateUrl: './ag-grid-detail-view.component.html',
})
export class AgGridDetailViewComponent implements OnInit {
  activeNavLink: NavLink;
  navLinks: NavLink[] = [
    { label: 'First', link: 'firstTab' },
    { label: 'Second', link: 'secondTab' },
    { label: 'Third', link: 'thirdTab' },
    { label: 'Fourth', link: 'fourthTab' },
  ];

  constructor(public route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const { url } = this.router;
    this.activeNavLink = this.navLinks.find((nL) => url.includes(nL.link));
    if (!this.activeNavLink) {
      this.activeNavLink = this.navLinks[0];
      this.router.navigate([this.activeNavLink?.link], {
        relativeTo: this.route,
        replaceUrl: true,
      });
    }
  }
}
