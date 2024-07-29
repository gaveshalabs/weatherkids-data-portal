import { environment as devEnv } from './environment.dev';

export const kiteenvironment = {
    // apiBaseUrl: 'https://data-api.gavesha.space/api',
    apiBaseUrl: 'https://data-api.gavesha.space:8443/api',
    production: false,
    firebaseConfig: devEnv.firebaseConfig, // Use same dev firebase config.
};
