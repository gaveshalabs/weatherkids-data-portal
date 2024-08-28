import { Component, OnInit, OnDestroy } from '@angular/core';
import { KiteApiService } from '../../../pages/kite-competition/kite/kite-api.service';
import { Router } from '@angular/router';
import { KitePlayer } from '../leaderboard.interface';
import { OAuth2Service } from '../../../modules/oauth2/oauth2.service';
import { UserProfile } from '../../../common/interfaces/user.interface';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ngx-myrecords',
    styleUrls: ['./my-records.component.scss'],
    templateUrl: './my-records.component.html',
})
export class MyRecordsComponent implements OnInit, OnDestroy {

    playerData: any; // Adjust to your specific type
    errorMessage: string | null = null;
    userSubscription: Subscription | null = null;

    constructor(
        private kiteApiService: KiteApiService,
        private router: Router,
        private oAuth2Service: OAuth2Service,
    ) {}

    ngOnInit(): void {
        // Subscribe to user changes
        this.userSubscription = this.oAuth2Service.getUser().subscribe(userProfile => {
            if (userProfile && userProfile._id) {
                this.fetchUserData(userProfile._id);
            } else {
                this.errorMessage = 'ඔයාගේ විස්තර බලන්න මුලින්ම Sign In වෙන්න';
                this.playerData = null;
            }
        });

        // Initial check in case the user is already logged in when the component is initialized
        this.checkLocalStorageAndFetchData();
    }

    private getUserIdFromLocalStorage(): string | null {
        const user = localStorage.getItem('user');
        if (user) {
            const userProfile: UserProfile = JSON.parse(user);
            return userProfile._id;
        }
        return null;
    }

    checkLocalStorageAndFetchData(): void {
        const userId = this.getUserIdFromLocalStorage();
        if (userId) {
            this.fetchUserData(userId);
        } else {
            this.errorMessage = 'ඔයාගේ විස්තර බලන්න මුලින්ම Sign In වෙන්න';
        }
    }

    fetchUserData(userId: string): void {
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
            }
        );
    }

    onCardClick(): void {
        const userId = this.getUserIdFromLocalStorage();
        if (userId) {
            this.kiteApiService.getKitePlayerByUserId(userId).subscribe(
                (playerData: KitePlayer) => {
                    if (playerData && playerData._id) {
                        const playerId = playerData._id;
                        this.router.navigate([`/kite/player/${playerId}`]);
                    } else {
                        console.log('No player ID found. Not navigating.');
                    }
                },
                (error) => {
                    console.error('Error fetching player data by user ID', error);
                }
            );
        } else {
            console.log('No user ID found in local storage. Not navigating.');
        }
    }

    ngOnDestroy(): void {
        // Unsubscribe from the user observable to avoid memory leaks
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }
}
