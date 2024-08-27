import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
    NbMediaBreakpointsService,
    NbMenuService,
    NbThemeService,
} from '@nebular/theme';

import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
    NbAuthOAuth2Token,
    NbAuthService,
} from '@nebular/auth';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { EnumUserContextMenu } from '../../../common/enums/user-action-context';
import { UserProfile } from '../../../common/interfaces/user.interface';
import { OAuth2Service } from '../../../modules/oauth2/oauth2.service';
import { NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Player } from '../../../@components/leaderboard/leaderboard.interface';
import { SharedDataService } from '../../../services/shared-data.service';


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
    returnUrl: string;
    @Input() combinedPlayers: Player[] = [];
    showSearchBar: boolean = false;



    constructor(
        // private mrauthService: MRAuthService,
        private sharedDataService: SharedDataService,
        private oAuthService: OAuth2Service,
        private menuService: NbMenuService,
        private themeService: NbThemeService,
        private breakpointService: NbMediaBreakpointsService,
        private authService: NbAuthService,
        private matIconRegistry: MatIconRegistry,
        domSanitizer: DomSanitizer,
        private dialog: MatDialog,
        private router: Router,
        private breakpointObserver: BreakpointObserver,
    ) {
        this.oAuthService.getUser().subscribe(user => {





            // console.log('the subscribed user', user);
            if (user) {

                this.loggedIn = true;

                this.userMenu = [
                    { title: EnumUserContextMenu.Profile },
                    { title: EnumUserContextMenu.Logout },
                ];

                this.user = user;
                // this.mrauthService.setUser(user);
            } else {
                this.loggedIn = false;
                this.userMenu = [{ title: EnumUserContextMenu.Profile }];
                this.user = null;
                // this.mrauthService.setUser(null);
            }
        });

        // Add Google Logo to MatIconRegistry
        this.matIconRegistry.addSvgIcon(
            'googleLogo',
            domSanitizer.bypassSecurityTrustResourceUrl(
                'assets/images/google-logo.svg'
            )
        );


        // this.router.events.subscribe((event) => {
        //     if (event instanceof NavigationEnd) {
        //         // Check if the URL starts with '/kite'
        //         this.showSearchBar = event.urlAfterRedirects.startsWith('/kite');
        //     }
        // });


        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.showSearchBar = event.urlAfterRedirects.startsWith('/kite');
            }
        });


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
        this.returnUrl = this.router.url; // Capture the current URL
        await this.oAuthService.login(this.returnUrl);
    }
    // async onSignIn() {
    //     return this.oAuthService.login();
    // }

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

    // navigateHome() {
    //     this.menuService.navigateHome();
    //     return false;
    // }

    navigateHome() {
        this.router.navigate(['/']); // Navigate to the home route
        return false; // Prevent default anchor behavior
    }

    ngOnInit() {

        this.sharedDataService.players$.subscribe(players => {
            this.combinedPlayers = players;
            console.log('Received players in HeaderComponent:', this.combinedPlayers);
        });
        // Ensure showSearchBar is correctly initialized based on the current URL

        this.showSearchBar = this.router.url.startsWith('/kite');

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

        this.menuService.onItemClick().subscribe(event => {
            this.onContextItemSelection(event.item.title);
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }


    // ngOnInit() {
    //     const { xl } = this.breakpointService.getBreakpointsMap();
    //     this.themeService
    //         .onMediaQueryChange()
    //         .pipe(
    //             map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
    //             takeUntil(this.destroy$)
    //         )
    //         .subscribe(
    //             (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
    //         );

    //     // The dropdown by clicking user profile icon.
    //     this.menuService.onItemClick().subscribe(event => {
    //         this.onContextItemSelection(event.item.title);
    //     });
    // }

    // ngOnDestroy() {
    //     this.destroy$.next();
    //     this.destroy$.complete();
    // }







    // toggleSidebar(): boolean {
    //   this.sidebarService.toggle(true, "menu-sidebar");
    //   this.layoutService.changeLayoutSize();

    //   return false;
    // }

    // openDialog(): void {
    //     const config: MatDialogConfig = {
    //     };
    //     this.dialog.open(RegisterNowComponent, config);
    // };
}
