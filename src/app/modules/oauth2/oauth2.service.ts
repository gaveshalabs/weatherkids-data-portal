import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import {
    UserProfile,
    convertToUserProfile,
} from '../../common/interfaces/user.interface';
import {
    Auth,
    GoogleAuthProvider,
    UserCredential,
    signInWithPopup,
    signOut,
    // } from '@angular/fire/auth/firebase';
} from '@angular/fire/auth';
import { Subject, BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SessionApiService } from '../../api/session-api.service';

@Injectable({
    providedIn: 'root',
})
export class OAuth2Service {
    private destroy$: Subject<void> = new Subject<void>();

    // userData: User;
    userData: UserProfile | null = null;
    authResult: UserCredential | null = null;
    userSubject: BehaviorSubject<UserProfile | null> =
        new BehaviorSubject<UserProfile | null>(null);

    user: Observable<UserProfile | null> = this.userSubject.asObservable();

    constructor(
        private sessionApiService: SessionApiService,
        private afAuth: Auth,
        // public afAuth: AngularFireAuth,
        // public authService: NbAuthService,
        public ngZone: NgZone,
        public router: Router,
        private http: HttpClient
    ) {
        const storedUser = localStorage.getItem('user');
        const initialUser = storedUser
            ? (JSON.parse(storedUser) as UserProfile)
            : null;
        this.userSubject = new BehaviorSubject<UserProfile | null>(initialUser);

        // this.user = this.userSubject.asObservable();

        // this.authService.onAuthenticationChange().subscribe(authenticated => {
        //     if (authenticated) {
        //         console.log('User is authenticated');
        //     } else {
        //         console.log('User is not authenticated.');

        //         // The user observer is cleared for state management
        //         // this.userSubject.next(null);
        //     }
        // });

        /* Saving user data in localstorage when logged in and setting up null when logged out */
        // this.afAuth.authState.subscribe(user => {
        //     if (user) {
        //         console.log('User is authenticated:', user);
        //         this.userData = convertToUserProfile(user);
        //         localStorage.setItem('user', JSON.stringify(this.authResult));
        //         const url = `${environment.apiBaseUrl}/auth/id-token`;
        //         // const body = { 'idToken':this.authResult.credential.providerId }; // Assuming you only need to send idToken
        //         console.log(this.authResult.credential);
        //         const body = { idToken: 'this.authResult.credential.idToken' };
        //         return this.http.post(url, body);
        //     } else {
        //         console.log('User is not authenticated.');
        //         localStorage.setItem('user', null);
        //     }
        // });
    }

    fetchGoogleUserInfo(accessToken: string): Observable<UserProfile> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
        });

        return this.http
            .get<UserProfile>('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers,
        })
            .pipe(
                map(response => response),
                catchError(error => {
                    console.error('Error fetching Google user info:', error);
                    return throwError(
                        () => new Error('Error fetching Google user info')
                    );
                })
            );
    }

    // Call the methods using NbAuthService
    async login() {
        // console.log('OAuth2Service.login()');

        return signInWithPopup(this.afAuth, new GoogleAuthProvider()).then(
            result => {
                // console.log('OAuth2Service.login() result:', result);
                // this.setUserData(result.user);
                // console.log(
                //     'OAuth2Service.login() firebase login result:',
                //     result
                // );
                // console.log('OAuth2Service.login() idToken:', idToken);

                const idToken = result['_tokenResponse']['oauthIdToken'];

                // After user has signed in, call API to establish Gavesha session with the Gavesha API
                this.sessionApiService
                    .establishGaveshaSession(
                        {
                            uid: result.user['uid'],
                            email: result.user['email'],
                            name: result.user['displayName'],
                            photo_url: result.user['photoURL'],
                        },
                        idToken
                    )
                    .subscribe(
                        response => {
                            // console.log(
                            //     'OAuth2Service.login() session API response:',
                            //     response
                            // );

                            this.userData = convertToUserProfile(
                                response as Map<string, string>
                            );
                            localStorage.setItem(
                                'user',
                                JSON.stringify(this.userData)
                            );
                            this.userSubject.next(this.userData);
                            this.router.navigate(['dashboard']);
                        },
                        error => {
                            console.error(
                                'OAuth2Service.login() session API error:',
                                error
                            );
                        }
                    );
            },
            error => {
                console.error('OAuth2Service.login() error:', error);
                return throwError(() => new Error('Error logging in'));
            }
        );
        // return signInWithPopup(this.afAuth, new GoogleAuthProvider()).subscribe(
        //     (authResult: NbAuthResult) => {}
        // );
        // return signInWithPopup(this.afAuth, new GoogleAuthProvider());
        // try {
        //     const provider = new firebase.default.auth.GoogleAuthProvider();
        //     const result = await this.afAuth.signInWithPopup(provider);
        //     this.router.navigate(['dashboard']);
        //     // this.setUserData(result.user);
        //     this.userData = convertToUserProfile(result.user);
        // } catch (error) {
        //     window.alert(error);
        // }
        // return this.authService
        //     .authenticate('google')
        //     .pipe(takeUntil(this.destroy$))
        //     .subscribe((authResult: NbAuthResult) => {});
    }

    logout() {
        return signOut(this.afAuth).then(
            result => {
                localStorage.removeItem('user');
                this.userSubject.next(null);
                this.router.navigate(['sign-in']);
            },
            error => {
                console.error('OAuth2Service.logout() error:', error);
                return throwError(() => new Error('Error logging out'));
            }
        );
        // return this.authService
        //     .logout('google')
        //     .pipe(takeUntil(this.destroy$))
        //     .subscribe((authResult: NbAuthResult) => {
        //         // Clear user state
        //         this.userSubject.next(null);

        //         // Clear local storage
        //         localStorage.setItem('user', null);
        //     });
    }

    getUser(): Observable<UserProfile | null> {
        return this.userSubject.asObservable();
    }

    // // Returns true when user is looged in and email is verified
    // get isLoggedIn(): boolean {
    //     const user = JSON.parse(localStorage.getItem('user') ?? null);
    //     return user !== null && user.emailVerified !== false ? true : false;
    // }

    // fetchGoogleUserInfo(accessToken: string): Observable<UserProfile> | null {
    //     let user: UserProfile | null = null;
    //     const headers = { Authorization: `Bearer ${accessToken}` };
    //     return this.http
    //         .get<any>('https://www.googleapis.com/oauth2/v3/userinfo', {
    //             headers,
    //         })
    //         .subscribe(
    //             userinfo => {
    //                 console.log('Google Userinfo', userinfo);
    //                 // Now you can store userinfo in your UserService or similar
    //                 localStorage.setItem('user', JSON.stringify(userinfo));
    //                 return (user = userinfo);
    //             },
    //             error => {
    //                 console.error('Error fetching user info:', error);
    //                 localStorage.setItem('user', null);
    //                 return (user = null);
    //             }
    //         );
    // }

    // Sign in with email/password
    // async signIn(email: string, password: string) {
    //     return this.afAuth
    //         .signInWithEmailAndPassword(email, password)
    //         .then(result => {
    //             // this.setUserData(result.user);
    //             this.afAuth.authState.subscribe(user => {
    //                 if (user) {
    //                     this.router.navigate(['dashboard']);
    //                 }
    //             });
    //         })
    //         .catch(error => {
    //             window.alert(error.message);
    //         });
    // }

    // // Sign up with email/password
    // async signUp(email: string, password: string) {
    //     return this.afAuth
    //         .createUserWithEmailAndPassword(email, password)
    //         .then(result => {
    //             /* Call the SendVerificaitonMail() function when new user sign up and returns promise */
    //             this.sendVerificationMail();
    //             // this.setUserData(result.user);
    //         })
    //         .catch(error => {
    //             window.alert(error.message);
    //         });
    // }

    // Send email verfificaiton when new user sign up
    // async sendVerificationMail() {
    //     return this.afAuth.currentUser
    //         .then((u: any) => u.sendEmailVerification())
    //         .then(() => {
    //             this.router.navigate(['verify-email-address']);
    //         });
    // }

    // Reset Forggot password
    // async forgotPassword(passwordResetEmail: string) {
    //     return this.afAuth
    //         .sendPasswordResetEmail(passwordResetEmail)
    //         .then(() => {
    //             window.alert('Password reset email sent, check your inbox.');
    //         })
    //         .catch(error => {
    //             window.alert(error);
    //         });
    // }

    // Sign in with Google
    // async googleAuth() {
    //     const res = await this.authLogin(new GoogleAuthProvider());
    //     this.router.navigate(['dashboard']);
    // }

    // Auth logic to run auth providers
    // async authLogin(provider: any) {
    //     try {
    //         const result = await this.afAuth.signInWithPopup(provider);

    //         this.router.navigate(['dashboard']);
    //         // this.setUserData(result.user);
    //         this.authResult = result;
    //     } catch (error) {
    //         window.alert(error);
    //     }
    // }

    /* Setting up user data when sign in with username/password, sign up with username/password and sign in with social auth provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    // setUserData(user: any) {
    //     const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    //         `users/${user.uid}`
    //     );

    //     const userData: User = {
    //         uid: user.uid,
    //         email: user.email,
    //         displayName: user.displayName,
    //         photoURL: user.photoURL,
    //         emailVerified: user.emailVerified,
    //     };

    //     return userRef.set(userData, {
    //         merge: true,
    //     });
    // }

    // setAuthData(authCredential: firebase.default.auth.UserCredential) {
    //     localStorage.setItem('user', JSON.stringify(authCredential));
    // }

    // Sign out
    // async signOut() {
    //     return this.afAuth.signOut().then(() => {
    //         localStorage.removeItem('user');
    //         this.router.navigate(['sign-in']);
    //     });
    // }
}
