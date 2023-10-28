/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnDestroy } from '@angular/core';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { OAuth2Service } from './oauth2.service';
import { UserProfile } from '../../common/interfaces/user.interface';

@Component({
    selector: 'ngx-nb-oauth2-callback',
    template: `
        <nb-layout>
            <nb-layout-column>Authenticating...</nb-layout-column>
        </nb-layout>
    `,
})
export class OAuth2CallbackComponent implements OnDestroy {
    private destroy$ = new Subject<void>();

    constructor(
        private authService: NbAuthService,
        private router: Router,
        private oauth2Service: OAuth2Service
    ) {
        // This is where the server redirects to after the user has authenticated with Google
        this.authService
            .authenticate('google')
            .pipe(takeUntil(this.destroy$))
            .subscribe((authResult: NbAuthResult) => {
                if (authResult.isSuccess() && authResult.getRedirect()) {
                    const token = authResult.getToken().getValue();

                    this.oauth2Service.fetchGoogleUserInfo(token).subscribe(
                        user => {
                            localStorage.setItem('user', JSON.stringify(user)); // Store user in local storage

                            // For the user state management
                            this.oauth2Service.userSubject.next(user);

                            this.router.navigateByUrl(authResult.getRedirect());
                        },
                        error => {
                            console.error('Error fetching user info:', error);

                            localStorage.setItem('user', null);

                            this.oauth2Service.userSubject.next(null);
                        }
                    );

                    this.router.navigateByUrl(authResult.getRedirect());
                } else {
                    console.log('login failed');
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
