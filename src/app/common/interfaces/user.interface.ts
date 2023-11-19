import { User } from 'firebase/auth';

export interface UserProfile {
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    locale: string;
    name: string;
    picture: string;
    sub: string;
}

export function convertToUserProfile(firebaseUser: User): UserProfile {
    return {
        email: firebaseUser.email ?? '', // Replace with empty string if null
        email_verified: firebaseUser.emailVerified,
        family_name:
            firebaseUser.displayName?.split(' ').slice(-1).join(' ') ?? '',
        given_name: firebaseUser.displayName?.split(' ')[0] ?? '',
        locale: firebaseUser.providerData[0]?.providerId ?? '', // Locale is not directly available in Firebase User
        name: firebaseUser.displayName ?? '',
        picture: firebaseUser.photoURL ?? '',
        sub: firebaseUser.uid,
    };
}
