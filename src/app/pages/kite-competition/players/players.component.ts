import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

export interface Section {
    id: string;
    name: string;
    img_url: string;
    kite_height: string;
    rank: string;
}

@Component({
    selector: 'ngx-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss'],
    standalone: true,
    imports: [MatListModule, NgFor],
})
export class PlayersComponent {
    players: Section[] = [
        {
            id: '4004',
            name: 'Kasun',
            img_url: 'https://live.staticflickr.com/7610/17097791912_5aedd91f22.jpg',
            kite_height: '800M',
            rank: '4',
        },
        {
            id: '4004',
            name: 'Nipuna',
            img_url: 'https://thumbs.dreamstime.com/b/portrait-handsome-man-15494209.jpg',
            kite_height: '600M',
            rank: '5',
        },
        {
            id: '4006',
            name: 'Ruwan',
            img_url: `https://i0.wp.com/littlely.eduworks.com.au/wp-content/uploads/Little.ly-Brock-Deneson-Profile-ID-183539.jpg?
                      resize=500%2C500&ssl=1`,
            kite_height: '1000M',
            rank: '6',
        },
        {
            id: '4007',
            name: 'Nuwan',
            img_url: 'https://th.bing.com/th/id/OIP.hd0I2qmDD3ZwQ18CnAQJaQHaHa?w=900&h=900&rs=1&pid=ImgDetMain',
            kite_height: '1200M',
            rank: '7',
        },
    ];
}
