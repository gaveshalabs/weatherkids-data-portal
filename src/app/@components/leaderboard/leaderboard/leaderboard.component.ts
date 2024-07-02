import { Component } from '@angular/core';

@Component({
  selector: 'ngx-kite-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class KiteLeaderboardComponent {

  topPlayers = [
    {
        id: '4001',
        name: 'Amal',
        img_url: 'https://th.bing.com/th/id/OIP.2KzBS2Bfpc7gVSPqPRCfGQHaJo?w=480&h=624&rs=1&pid=ImgDetMain',
        kite_height: '1500 M',
        rank: '1 st',
  },
  {
        id: '4002',
        name: 'Kamal',
        img_url: 'https://th.bing.com/th/id/OIP.gO5LWYvoOMEzspq6dNRiTwAAAA?w=420&h=420&rs=1&pid=ImgDetMain',
        kite_height: '1400 M',
        rank: '2 nd',
  },
  {
        id: '4003',
        name: 'Nimal',
        img_url: 'https://th.bing.com/th/id/OIP.9v3dZrOkWdDmpkVNodj5RAHaLG?w=667&h=1000&rs=1&pid=ImgDetMain',
        kite_height: '1400 M',
        rank: '3 rd',
},
  ];
}
