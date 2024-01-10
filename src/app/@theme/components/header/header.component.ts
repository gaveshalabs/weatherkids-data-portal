import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    NbMediaBreakpointsService,
    NbMenuService,
    NbThemeService,
} from '@nebular/theme';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
    NbAuthOAuth2Token,
    NbAuthResult,
    NbAuthService,
    NbAuthToken,
} from '@nebular/auth';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { EnumUserContextMenu } from '../../../common/enums/user-action-context';
import { UserProfile } from '../../../common/interfaces/user.interface';
import { OAuth2Service } from '../../../modules/oauth2/oauth2.service';
import { OAuth2CallbackComponent } from '../../../modules/oauth2/oauth2-callback.component';
import packageJson from '../../../../../package.json';

@Component({
    selector: 'ngx-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

    private destroy$: Subject<void> = new Subject<void>();
    loggedIn: boolean = false;

    userPictureOnly: boolean = false;

    user: UserProfile;

    // The dropdown by clicking user profile icon
    userMenu = [{}];

    token: NbAuthOAuth2Token;

    constructor(
        private oAuthService: OAuth2Service,
        private menuService: NbMenuService,
        private themeService: NbThemeService,
        private breakpointService: NbMediaBreakpointsService,
        private authService: NbAuthService,
        private matIconRegistry: MatIconRegistry,
        domSanitizer: DomSanitizer
    ) {
        console.info(`v${packageJson.version}`);
        this.oAuthService.getUser().subscribe(user => {
            // console.log('the subscribed user', user);
            if (user) {
                this.loggedIn = true;

                this.userMenu = [
                    { title: EnumUserContextMenu.Profile },
                    { title: EnumUserContextMenu.Logout },
                ];

                this.user = user;
            } else {
                this.loggedIn = false;
                this.userMenu = [{ title: EnumUserContextMenu.Profile }];
                this.user = null;
            }
        });

        // Add Google Logo to MatIconRegistry
        this.matIconRegistry.addSvgIcon(
            'googleLogo',
            domSanitizer.bypassSecurityTrustResourceUrl(
                'assets/images/google-logo.svg'
            )
        );

        // this.authService
        //     .onTokenChange()
        //     .pipe(takeUntil(this.destroy$))
        //     .subscribe((token: NbAuthToken) => {
        //         this.token = null;
        //         if (token && token.isValid()) {
        //             this.token = token as NbAuthOAuth2Token;
        //         }
        //     });

        // this.authService.onAuthenticationChange().subscribe(authenticated => {
        //     if (authenticated) {
        //         this.loggedIn = true;

        //         this.userMenu = [
        //             { title: EnumUserContextMenu.Profile },
        //             { title: EnumUserContextMenu.Logout },
        //         ];

        //         // this.oAuthService.getUser().subscribe(user => {
        //         //     console.log('the subscribed user', user);
        //         // });

        //         // this.user = JSON.parse(
        //         //     localStorage.getItem('user')
        //         // ) as UserProfile;
        //     } else {
        //         this.loggedIn = false;
        //         this.userMenu = [{ title: EnumUserContextMenu.Profile }];
        //         this.user = null;
        //     }
        // });

        // Listen for auth changes
        // this.afAuth.authState.subscribe(user => {
        //     if (user) {
        //         this.loggedIn = true;
        //         this.userMenu = [
        //             { title: EnumUserContextMenu.Profile },
        //             { title: EnumUserContextMenu.Logout },
        //         ];
        //         this.user = { name: user.displayName, picture: user.photoURL };
        //     } else {
        //         this.loggedIn = false;
        //         this.userMenu = [{ title: EnumUserContextMenu.Profile }];
        //         this.user = {};
        //     }
        // });
    }

    async onSignIn() {
        return this.oAuthService.login();
    }

    async onLogout() {
        return this.oAuthService.logout();
    }

    // Context menu when click on user profile icon
    async onContextItemSelection(title) {
        switch (title) {
            case EnumUserContextMenu.Profile:
                // console.log('Profile');

                // console.log(this.user);

                // console.log(await this.afAuth.currentUser);
                break;
            case EnumUserContextMenu.Logout:
                // this.authService.signOut();
                return this.onLogout();
        }
    }

    navigateHome() {
        this.menuService.navigateHome();
        return false;
    }

    ngOnInit() {
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

        // The dropdown by clicking user profile icon.
        this.menuService.onItemClick().subscribe(event => {
            this.onContextItemSelection(event.item.title);
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    // toggleSidebar(): boolean {
    //   this.sidebarService.toggle(true, "menu-sidebar");
    //   this.layoutService.changeLayoutSize();

    //   return false;
    // }
}
