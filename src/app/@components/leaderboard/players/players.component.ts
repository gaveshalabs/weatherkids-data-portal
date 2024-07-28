import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from '../leaderboard.interface';

@Component({
    selector: 'ngx-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
    @Input() players: Player[] = [];
    hoverPlayer: Player | null = null;
    activePlayerId: string | null = null;

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.activePlayerId = params['playerId'] || null;
            this.setActivePlayerHover();
        });
    }

    setActivePlayerHover() {
        if (this.activePlayerId) {
            this.hoverPlayer = this.players.find(player => player.id === this.activePlayerId) || null;
        }
    }

    activePlayer(player: Player) {
        this.activePlayerId = player.id;

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


