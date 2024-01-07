import { environment as devEnv } from './environment.dev';

export const environment = {
    apiBaseUrl: 'http://localhost:3000/api',
    production: false,
    firebaseConfig: devEnv.firebaseConfig, // Use same dev firebase config.
};
