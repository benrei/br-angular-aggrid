import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavLink } from '../nav-link';

@Component({
  selector: 'app-tab-navigation',
  template: ` <nav mat-tab-nav-bar>
    <a
      mat-tab-link
      *ngFor="let navlink of navLinks"
      (click)="activeNavLink = navlink"
      [active]="activeNavLink == navlink"
      [routerLink]="navlink.link"
      [relativeTo]="route"
    >
      {{ navlink.label }}
    </a>
  </nav>`,
  styleUrls: ['./tab-navigation.component.scss'],
})
export class TabNavigationComponent implements OnInit {
  ngOnInit(): void {
    this.activeNavLink = this.activeNavLink || this.navLinks[0];
  }
  @Input() activeNavLink: NavLink;
  @Input() navLinks: NavLink[];
  @Input() route: ActivatedRoute;
}
