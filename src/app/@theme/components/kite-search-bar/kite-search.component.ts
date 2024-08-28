import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Player } from '../../../@components/leaderboard/leaderboard.interface';

@Component({
    selector: 'ngx-kite-search',
    templateUrl: './kite-search.component.html',
    styleUrls: ['./kite-search.component.scss'],
})

export class KiteSearchComponent implements OnInit, OnChanges {
    @Output() selected: EventEmitter<Player> = new EventEmitter();
    @Output() close: EventEmitter<void> = new EventEmitter();
    @Input() playerList: Player[] = [];

    searchInput: string = '';
    playerFiltered: Player[] = [];
    showClose = false;

    constructor(private router: Router) { }

    ngOnInit(): void {
        if (this.close.observers.length) {
            this.showClose = true;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.playerList && changes.playerList.currentValue) {
            console.log('playerList changed:', this.playerList);
            this.filterPlayer();
        } else {
            console.warn('playerList is undefined or empty');
        }
    }
    filterPlayer() {
        console.log('filterPlayer called');
        console.log('searchInput:', this.searchInput);

        // Ensure the player list exists and is not empty
        if (!this.playerList || !this.playerList.length) {
            console.error('playerList is empty or not populated');
            return;
        }

        const searchText = this.searchInput.toLowerCase().trim();

        // Only filter if the search input has at least one character
        if (searchText.length > 0) {
            this.playerFiltered = this.playerList.filter(player => {
                if (player && (player.name || player.city)) {
                    const nameMatch = player.name ? player.name.toLowerCase().includes(searchText) : false;
                    const cityMatch = player.city ? player.city.toLowerCase().includes(searchText) : false;
                    return nameMatch || cityMatch;
                }
                return false;
            });
        } else {
            // Clear the filtered list if the search input is empty
            this.playerFiltered = [];
        }

        console.log('Filtered Players:', this.playerFiltered);
    }

    loadPlayerSummary(event: MatAutocompleteSelectedEvent) {
        const selectedPlayer = event.option.value as Player;
        if (selectedPlayer && selectedPlayer.id) {
            this.router.navigate(['/kite/player', selectedPlayer.id]);
        }
    }

    selectedOptionDisplay(player: Player) {
        if (typeof player === 'string') {
            return player;
        }
        return player ? player.name : '';
    }

    closeThis() {
        this.close.emit();
    }
}

