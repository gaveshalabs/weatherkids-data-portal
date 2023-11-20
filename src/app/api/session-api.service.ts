import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IGaveshaSession } from '../common/interfaces/gavesha-session.interface';

@Injectable()
export class SessionApiService {
    constructor(private httpClient: HttpClient) {}

    // Establish a session with Gavesha server
    establishGaveshaSession(session: IGaveshaSession) {
        return this.httpClient.post(
            `${environment.apiBaseUrl}/session`,
            session
        );
    }
}
