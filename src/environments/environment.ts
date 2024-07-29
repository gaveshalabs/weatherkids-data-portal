import { environment as devEnv } from './environment.dev';

export const environment = {
    apiBaseUrl:
    'https://data-api.gavesha.space:8443/api',
    // 'https://data-api.gavesha.space/api',
    production: false,
    firebaseConfig: devEnv.firebaseConfig, // Use same dev firebase config.
};
