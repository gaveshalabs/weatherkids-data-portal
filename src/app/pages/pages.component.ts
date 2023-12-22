import { Component } from '@angular/core';
import {
    NbMenuService,
    NbSidebarService,
} from '@nebular/theme';
import { MENU_ITEMS } from './pages-menu';

@Component({
    selector: 'ngx-pages',
    styleUrls: ['pages.component.scss'],
    template: `
    <ngx-weather-portal-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-weather-portal-layout>
  `,
})
export class PagesComponent {
    menu = MENU_ITEMS;

    constructor(
        menuService: NbMenuService,
        sidebarService: NbSidebarService
    ) {
        menuService.onItemClick().subscribe(event => {
            if (event.item.title === 'Menu') {
                sidebarService.toggle(true, 'menu-sidebar');

                sidebarService.getSidebarState('menu-sidebar').subscribe((sidebarState) => {
                    if (sidebarState === 'expanded') {
                        event.item.icon = 'menu-arrow-outline';
                    } else {
                        event.item.icon = 'menu-outline';
                    }
                });
            }
        });
    }


}
