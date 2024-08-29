import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from './loader.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'ngx-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
    loading = false;
    private subscription: Subscription;
    isDarkTheme: boolean = false;


    private checkRoute(): void {
        const currentRoute = this.router.url;
        this.isDarkTheme = currentRoute.startsWith('/kite');
    }

    constructor(loaderService: LoaderService,
        private router: Router,
    ) {
        this.subscription = loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.loading = state.show;
            });
    }

    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.checkRoute();
        });
        this.checkRoute();
    }

}
