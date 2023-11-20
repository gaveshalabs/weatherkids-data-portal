import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IGaveshaSession } from '../common/interfaces/gavesha-session.interface';

@Injectable()
export class SessionApiService {
    constructor(private httpClient: HttpClient) {}

    // Establish a session with Gavesha server
    establishGaveshaSession(session: IGaveshaSession, idToken: string) {
        const headers = new HttpHeaders().set('id-token', idToken);

        return this.httpClient.post(
            `${environment.apiBaseUrl}/session`,
            session,
            { headers: headers }
        );
    }
}
