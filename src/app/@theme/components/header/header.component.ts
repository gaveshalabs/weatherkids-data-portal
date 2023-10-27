import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
    NbMediaBreakpointsService,
    NbMenuService,
    NbThemeService,
} from '@nebular/theme';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../modules/auth/auth.service';
import { EnumUserContextMenu } from '../../../common/enums/user-action-context';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'ngx-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    loggedIn: boolean = false;
    private destroy$: Subject<void> = new Subject<void>();
    userPictureOnly: boolean = false;
    user: any;

    themes = [
        {
            value: 'default',
            name: 'Light',
        },
        {
            value: 'dark',
            name: 'Dark',
        },
        {
            value: 'cosmic',
            name: 'Cosmic',
        },
        {
            value: 'corporate',
            name: 'Corporate',
        },
    ];

    currentTheme = 'default';

    // The dropdown by clicking user profile icon
    userMenu = [{}];

    constructor(
        private menuService: NbMenuService,
        private themeService: NbThemeService,
        private breakpointService: NbMediaBreakpointsService,
        private authService: AuthService,
        private afAuth: AngularFireAuth,
        private matIconRegistry: MatIconRegistry,
        domSanitizer: DomSanitizer
    ) {
        // Listen for auth changes
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.loggedIn = true;
                this.userMenu = [
                    { title: EnumUserContextMenu.Profile },
                    { title: EnumUserContextMenu.Logout },
                ];
                this.user = { name: user.displayName, picture: user.photoURL };
            } else {
                this.loggedIn = false;
                this.userMenu = [{ title: EnumUserContextMenu.Profile }];
                this.user = {};
            }
        });

        // Add Google Logo to MatIconRegistry
        matIconRegistry.addSvgIcon(
            'googleLogo',
            domSanitizer.bypassSecurityTrustResourceUrl(
                'assets/images/google-logo.svg'
            )
        );
    }

    ngOnInit() {
        this.currentTheme = this.themeService.currentTheme;
        this.user = {};

        const { xl } = this.breakpointService.getBreakpointsMap();
        this.themeService
            .onMediaQueryChange()
            .pipe(
                map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
                takeUntil(this.destroy$)
            )
            .subscribe(
                (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
            );

        this.themeService
            .onThemeChange()
            .pipe(
                map(({ name }) => name),
                takeUntil(this.destroy$)
            )
            .subscribe(themeName => (this.currentTheme = themeName));

        // The dropdown by clicking user profile icon.
        this.menuService.onItemClick().subscribe(event => {
            this.onContextItemSelection(event.item.title);
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    // changeTheme(themeName: string) {
    //   this.themeService.changeTheme(themeName);
    // }

    // toggleSidebar(): boolean {
    //   this.sidebarService.toggle(true, "menu-sidebar");
    //   this.layoutService.changeLayoutSize();

    //   return false;
    // }

    navigateHome() {
        this.menuService.navigateHome();
        return false;
    }

    // Auth Stuff
    async onSignIn() {
        return this.authService.googleAuth().catch(e => {});
    }

    async onContextItemSelection(title) {
        switch (title) {
            case EnumUserContextMenu.Profile:
                console.log(await this.afAuth.currentUser);
                break;
            case EnumUserContextMenu.Logout:
                this.authService.signOut();
                break;
        }
    }
}
