import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserProfile } from '../common/interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class UserApiService {

    constructor(private httpClient: HttpClient) { }

    getUserProfile(user_id: string) {
        return this.httpClient.get<UserProfile>(
            `${environment.apiBaseUrl}/users/${user_id}`
        );
    }
}
