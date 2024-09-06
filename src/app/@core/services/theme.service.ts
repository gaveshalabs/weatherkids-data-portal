// import { Injectable } from '@angular/core';
// import { NbThemeService } from '@nebular/theme';

// @Injectable({
//   providedIn: 'root',
// })
// export class ThemeService {
//   constructor(private themeService: NbThemeService) {}

//   setTheme(themeName: string) {
//     this.themeService.changeTheme(themeName);
//   }
// }



import { Injectable } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    constructor(private themeService: NbThemeService) {}

    setTheme(themeName: string) {
        this.themeService.changeTheme(themeName);
    }
}
