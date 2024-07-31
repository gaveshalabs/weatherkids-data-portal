import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { OAuth2Service } from '../../../modules/oauth2/oauth2.service';
import { UserProfile } from '../../../common/interfaces/user.interface';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Player } from '../../../@components/leaderboard/leaderboard.interface';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

enum CurrentViewType {
    MyData,
    AllData,
    PlayerData
}

@Component({
    selector: 'ngx-toggle-card',
    templateUrl: './toggle-card.component.html',
    styleUrls: ['./toggle-card.component.scss'],
})
export class ToggleCardComponent implements OnInit {

    user: UserProfile;
    footerContent: string = 'සියළු තරඟකරුවන්ගේ වාර්තාව';
    currentView: CurrentViewType = CurrentViewType.AllData;
    allViewTypes = CurrentViewType;
    players: Player[] = [];
    returnUrl: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private oAuthService: OAuth2Service,
        private http: HttpClient,
    ) {}

    ngOnInit() {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.updateFooterContent();
            });

        this.oAuthService.getUser().subscribe(user => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user)); // Store user in local storage
                this.user = user;
            } else {
                localStorage.removeItem('user'); // Clear user from local storage
                this.user = null;
            }
            this.updateFooterContent();
        });

        this.loadPlayers();
    }

    async onSignIn() {
        this.returnUrl = this.router.url; // Capture the current URL
        await this.oAuthService.login(this.returnUrl);
    }

    onViewMyDetails() {
        const userId = this.getUserIdFromLocalStorage();
        this.currentView = CurrentViewType.MyData; // Set view to MyData

        if (userId) {
            this.getKitePlayerByUser(userId).subscribe(response => {
                if (response && response._id) {
                    this.router.navigate(['/kite/player', response._id]).then(() => {
                        this.footerContent = 'ඔයාගේ තරඟ වාර්තාව';
                    });
                } else {
                    this.footerContent = 'සරුංගල් මේනියා සමඟ ලියාපදිංචි වී \
                    නෙළුම් කුළුණට වඩා උඩින් සරුංගල් යවන්න ඔයත් එකතු වෙන්න';
                }
            }, error => {
                if (error.status === 404) {
                    this.footerContent = 'සරුංගල් මේනියා සමඟ ලියාපදිංචි වී \
                    නෙළුම් කුළුණට වඩා උඩින් සරුංගල් යවන්න ඔයත් එකතු වෙන්න';
                } else {
                    console.error('Error fetching player data:', error);
                    this.footerContent = 'Error fetching player data.';
                }
            });
        } else {
            this.footerContent = 'ඔයාගේ විස්තර බලන්න මුලින්ම Sign In වෙන්න';
            this.onSignIn();
        }
    }

    onViewAllDetails() {
        this.currentView = CurrentViewType.AllData; // Set view to AllData
        this.router.navigate(['/kite/player/all']);
    }

    goToPlayerIntroduction(player: Player) {
        this.router.navigate(['/kite/player', player.id], {
            state: { player },
        });
        this.currentView = CurrentViewType.PlayerData; // Set view to PlayerData
        this.footerContent = `You are viewing ${player.name}'s details @${player.city}`; // Update footer content
    }

    private updateFooterContent() {
        const currentUrl = this.router.url;
        const userId = this.getUserIdFromLocalStorage();

        if (currentUrl === '/kite/player/all') {
            this.currentView = CurrentViewType.AllData;
            this.footerContent = 'සියළු තරඟකරුවන්ගේ වාර්තාව';
        } else if (currentUrl.startsWith('/kite/player/')) {
            const playerId = this.route.snapshot.paramMap.get('id');
            if (playerId) {
                const player = this.players.find(p => p.id === playerId);
                if (player) {
                    if (userId && userId === playerId) {
                        this.currentView = CurrentViewType.MyData;
                        this.footerContent = 'ඔයාගේ තරඟ වාර්තාව';
                    } else {
                        this.currentView = CurrentViewType.PlayerData;
                        this.footerContent = `තරඟ වාර්තාව: ${player.name} @ ${player.city}`;
                    }
                } else {
                    this.currentView = CurrentViewType.PlayerData;
                    this.footerContent = 'තරඟකරුවා ගැන විස්තර සොයා ගැනීමට නැත';
                }
            } else {
                this.currentView = CurrentViewType.PlayerData;
                this.footerContent = 'You are viewing player records';
            }
        } else {
            this.currentView = CurrentViewType.AllData;
            this.footerContent = 'සියළු තරඟකරුවන්ගේ වාර්තාව';
        }
    }

    fetchPlayerData(playerId: string): Observable<Player> {
        return this.http.get<Player>(`${environment.apiBaseUrl}/kite-data/player/${playerId}`);
    }

    loadPlayers() {
        this.getPlayersLeaderboard().subscribe(players => {
            this.players = players;
            this.updateFooterContent(); // Ensure footer content is updated after players are loaded
        }, error => {
            console.error('Error fetching players leaderboard:', error);
        });
    }

    getPlayersLeaderboard(): Observable<Player[]> {
        return this.http.get<Player[]>(`${environment.apiBaseUrl}/kite-data/players-leaderboard`);
    }

    getKitePlayerByUser(userId: string): Observable<any> {
        return this.http.get<any>(`${environment.apiBaseUrl}/kite-players/users/${userId}`);
    }

    private getUserIdFromLocalStorage(): string | null {
        const user = localStorage.getItem('user');
        if (user) {
            const userProfile: UserProfile = JSON.parse(user);
            return userProfile._id;
        }
        return null;
    }
}
