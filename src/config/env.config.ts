export const ENV_CONFIG = {
  petstore: {
    baseURL: 'https://petstore.swagger.io/v2',
  },
  google: {
    baseURL: 'https://www.google.com',
  },
};

export function getPetstoreBaseURL(): string {
  return ENV_CONFIG.petstore.baseURL;
}

export function getGoogleURL(): string {
  return ENV_CONFIG.google.baseURL;
}
