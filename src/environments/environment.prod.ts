import { defaultEnvironment } from './environment.default';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
    ...defaultEnvironment,
    apiBaseUrl: 'https://us-central1-weatherkids-f85f4.cloudfunctions.net/api',
    production: true,
};
