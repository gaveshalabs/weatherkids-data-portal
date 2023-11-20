export interface UserProfile {
    photoUrl: string;
    contact_no: string;
    email: string;
    gavesha_user_api_key: string;
    is_active: string;
    name: string;
    nearest_city: string;
    nearest_city_postalcode: string;
    _id: string;
}

export function convertToUserProfile(
    userData: Map<string, string>
): UserProfile {
    return {
        photoUrl: userData['photo_url'] ?? '',
        contact_no: userData['contact_no'] ?? '',
        email: userData['email'] ?? '', // Replace with empty string if null
        gavesha_user_api_key: userData['gavesha_user_api_key'] ?? '',
        is_active: userData['is_active'] ?? '',
        name: userData['name'] ?? '',
        nearest_city: userData['nearest_city'] ?? '',
        nearest_city_postalcode: userData['nearest_city_postalcode'] ?? '',
        _id: userData['_id'] ?? '',
    };
}

// export function convertToUserProfile(firebaseUser: User): UserProfile {
//     return {
//         email: firebaseUser.email ?? '', // Replace with empty string if null
//         email_verified: firebaseUser.emailVerified,
//         family_name:
//             firebaseUser.displayName?.split(' ').slice(-1).join(' ') ?? '',
//         given_name: firebaseUser.displayName?.split(' ')[0] ?? '',
//         locale: firebaseUser.providerData[0]?.providerId ?? '', // Locale is not directly available in Firebase User
//         name: firebaseUser.displayName ?? '',
//         picture: firebaseUser.photoURL ?? '',
//         uid: firebaseUser.uid,
//     };
// }
