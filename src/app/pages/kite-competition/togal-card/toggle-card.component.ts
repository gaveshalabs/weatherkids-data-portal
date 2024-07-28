import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { OAuth2Service } from '../../../modules/oauth2/oauth2.service';
import { UserProfile } from '../../../common/interfaces/user.interface';
import { filter, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Player } from '../../../@components/leaderboard/leaderboard.interface';
import { kiteenvironment } from '../kite/kite-environments/environment';
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
    footerContent: string = 'You are viewing all players view';
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
                localStorage.setItem('user_id', user._id); // Store user ID in local storage
                this.user = user;
            } else {
                localStorage.removeItem('user_id'); // Clear user ID from local storage
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
        // console.log('User ID:', userId);

        this.currentView = CurrentViewType.MyData; // Set view to MyData

        if (userId) {
            this.footerContent = 'You are signed in, but you have not recorded any data yet.';
        } else {
            this.footerContent = 'You are not signed in. Please sign in.';
            this.onSignIn();
        }
    }

    onViewAllDetails() {
        this.currentView = CurrentViewType.AllData; // Set view to AllData
        this.router.navigate(['/kite']);
    }

    goToPlayerIntroduction(player: Player) {
        this.router.navigate(['/kite/player', player.id], {
            state: { player },
        });
        this.currentView = CurrentViewType.PlayerData; // Set view to PlayerData
        this.footerContent = 'You are viewing your details'; // Update footer content
    }

    private updateFooterContent() {
        const currentUrl = this.router.url;
        const userId = this.getUserIdFromLocalStorage();

        if (currentUrl.includes('/kite/player/')) {
            const playerId = this.route.snapshot.paramMap.get('id');
            if (playerId) {
                this.currentView = CurrentViewType.PlayerData;
                if (this.players.length) {
                    const player = this.players.find(p => p.id === playerId);
                    if (player) {
                        this.footerContent = `You are viewing ${player.name}'s details @${player.city}`;
                    } else {
                        this.footerContent = 'Player data not found';
                    }
                } else {
                    this.footerContent = 'Loading player data...';
                }
            }
        } else if (currentUrl === '/kite') {
            this.currentView = CurrentViewType.AllData;
            this.footerContent = 'You are viewing all players view';
        } else {
            this.currentView = CurrentViewType.AllData;
            this.footerContent = 'You are viewing all players view';
        }
    }

    fetchPlayerData(playerId: string): Observable<Player> {
        return new Observable<Player>(observer => {
            if (this.players.length) {
                const player = this.players.find(p => p.id === playerId);
                if (player) {
                    observer.next(player);
                    observer.complete();
                } else {
                    observer.error('Player not found');
                }
            } else {
                observer.error('Players data not loaded');
            }
        }).pipe(
            switchMap(() => this.getPlayersLeaderboard().pipe(
                switchMap(players => {
                    this.players = players;
                    const player = this.players.find(p => p.id === playerId);
                    if (player) {
                        return of(player);
                    } else {
                        throw new Error('Player not found');
                    }
                })
            ))
        );
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
        return this.http.get<Player[]>(`${kiteenvironment.apiBaseUrl}/kite-data/players-leaderboard`);
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
