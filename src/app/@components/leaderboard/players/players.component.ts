import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Player } from '../leaderboard.interface';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'ngx-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit, OnDestroy {
    @Input() players: Player[] = [];
    hoverPlayer: Player | null = null;
    activePlayerId: string | null = null;
    private routeSub: Subscription;
    private routerSub: Subscription;

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        // Retrieve the activePlayerId from localStorage
        this.activePlayerId = localStorage.getItem('activePlayerId');
        this.setActivePlayerHover();

        // Subscribe to route parameters
        this.routeSub = this.route.params.subscribe(params => {
            const playerId = params['playerId'];
            if (playerId) {
                this.activePlayerId = playerId;
                localStorage.setItem('activePlayerId', playerId);
                this.setActivePlayerHover();
            }
        });

        // Listen to router events to clear hover on navigation
        this.routerSub = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                // If navigated to '/kite/player/all', clear activePlayerId
                if (this.router.url === '/kite/player/all') {
                    this.clearHoverState();
                }
            });
    }

    ngOnDestroy() {
        // Unsubscribe to prevent memory leaks
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
        if (this.routerSub) {
            this.routerSub.unsubscribe();
        }
    }

    setActivePlayerHover() {
        if (this.activePlayerId) {
            this.hoverPlayer = this.players.find(player => player.id === this.activePlayerId) || null;
        } else {
            this.hoverPlayer = null;
        }
    }

    clearHoverState() {
        this.activePlayerId = null;
        this.hoverPlayer = null;
        localStorage.removeItem('activePlayerId');
    }

    clearHoverAndActiveState() {
        this.clearHoverState();
    }

    activePlayer(player: Player) {
        this.activePlayerId = player.id;
        localStorage.setItem('activePlayerId', player.id);
        // Clear hoverPlayer to ensure no lingering hover effects
        this.hoverPlayer = null;
    }

    goToPlayerIntroduction(player: Player) {
        this.activePlayer(player);
        this.router.navigate(['/kite/player', player.id], {
            state: {
                player,
            },
        });
    }

    getPlayerImageUrl(imgtopUrl: string): string {
        if (!imgtopUrl) {
            return 'assets/default-image-url.jpg';
        }

        if (imgtopUrl.startsWith('assets/avatars/Avatar_Icons/')) {
            return imgtopUrl;
        }

        const filename = imgtopUrl.substring(imgtopUrl.lastIndexOf('/') + 1);
        return `assets/avatars/Avatar_Icons/${filename}`;
    }

    isActivePlayer(player: Player): boolean {
        return this.activePlayerId === player.id;
    }
}






