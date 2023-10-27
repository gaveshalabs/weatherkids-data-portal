import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';

import { GoogleAuthProvider } from 'firebase/auth';
import { User } from '../../common/interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userData: User;
    authResult: firebase.default.auth.UserCredential;

    constructor(
        public afAuth: AngularFireAuth,
        public afs: AngularFirestore,
        public ngZone: NgZone,
        public router: Router
    ) {
        /* Saving user data in localstorage when logged in and setting up null when logged out */
        this.afAuth.authState.subscribe(user => {
            if (user) {
                console.log('User is authenticated:', user);
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.authResult));
            } else {
                console.log('User is not authenticated.');
                localStorage.setItem('user', null);
            }
        });
    }

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
    async sendVerificationMail() {
        return this.afAuth.currentUser
            .then((u: any) => u.sendEmailVerification())
            .then(() => {
                this.router.navigate(['verify-email-address']);
            });
    }

    // Reset Forggot password
    async forgotPassword(passwordResetEmail: string) {
        return this.afAuth
            .sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            })
            .catch(error => {
                window.alert(error);
            });
    }

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user') ?? null);
        return user !== null && user.emailVerified !== false ? true : false;
    }

    // Sign in with Google
    async googleAuth() {
        const res = await this.authLogin(new GoogleAuthProvider());
        this.router.navigate(['dashboard']);
    }

    // Auth logic to run auth providers
    async authLogin(provider: any) {
        try {
            const result = await this.afAuth.signInWithPopup(provider);

            this.router.navigate(['dashboard']);
            // this.setUserData(result.user);
            this.authResult = result;
        } catch (error) {
            window.alert(error);
        }
    }

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
    async signOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['sign-in']);
        });
    }
}
