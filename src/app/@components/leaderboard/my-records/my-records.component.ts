import { Component, OnInit, OnDestroy } from '@angular/core';
import { KiteApiService } from '../../../pages/kite-competition/kite/kite-api.service';
import { Router } from '@angular/router';
import { TotalKiteData } from '../leaderboard.interface';
import { OAuth2Service } from '../../../modules/oauth2/oauth2.service';
import { UserProfile } from '../../../common/interfaces/user.interface';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../../@theme/components/loader/loader.service';

@Component({
    selector: 'ngx-myrecords',
    styleUrls: ['./my-records.component.scss'],
    templateUrl: './my-records.component.html',
})
export class MyRecordsComponent implements OnInit, OnDestroy {

    playerData: TotalKiteData | null = null;
    errorMessage: string | null = null;
    userSubscription: Subscription | null = null;

    constructor(
        private kiteApiService: KiteApiService,
        private router: Router,
        private oAuth2Service: OAuth2Service,
        private loaderService: LoaderService
    ) {}

    ngOnInit(): void {
        // Subscribe to user changes
        this.userSubscription = this.oAuth2Service.getUser().subscribe(userProfile => {
            if (userProfile && userProfile._id) {
                this.checkLocalStorageAndFetchData(userProfile._id);
            } else {
                this.errorMessage = 'ඔයාගේ විස්තර බලන්න මුලින්ම Sign In වෙන්න';
                this.playerData = null;
            }
        });
    }

    private getUserIdFromLocalStorage(): string | null {
        const user = localStorage.getItem('user');
        if (user) {
            const userProfile: UserProfile = JSON.parse(user);
            return userProfile._id;
        }
        return null;
    }

    checkLocalStorageAndFetchData(userId?: string): void {
        const storedUserId = userId || this.getUserIdFromLocalStorage();
        if (storedUserId) {
            this.fetchUserData(storedUserId);
        } else {
            this.errorMessage = 'ඔයාගේ විස්තර බලන්න මුලින්ම Sign In වෙන්න';
        }
    }

    fetchUserData(userId: string): void {
        this.loaderService.show();
        this.kiteApiService.getLatestUserData(userId).subscribe(
            (data) => {
                this.playerData = data;
                if (!data.player) {
                    this.errorMessage = 'සරුංගල් මේනියා සමඟ ලියාපදිංචි වී \
                    නෙළුම් කුළුණට වඩා උඩින් සරුංගල් යවන්න ඔයත් එකතු වෙන්න';
                } else {
                    this.errorMessage = null;
                }
            },
            (error) => {
                console.error('Error fetching user data', error);
                this.errorMessage = 'සරුංගල් මේනියා සමඟ ලියාපදිංචි වී \
                    නෙළුම් කුළුණට වඩා උඩින් සරුංගල් යවන්න ඔයත් එකතු වෙන්න';
            },
            () => {
                this.loaderService.hide();
            }
        );
    }

    onCardClick(): void {
        if (this.playerData && this.playerData.player && this.playerData.player.id) {
            const playerId = this.playerData.player.id;
            this.router.navigate([`/kite/player/${playerId}`]);
        } else {
            console.log('Player data not found or player ID missing. Not navigating.');
        }
    }

    ngOnDestroy(): void {
        // Unsubscribe from the user observable to avoid memory leaks
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }
}


