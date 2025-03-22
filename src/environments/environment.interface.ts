export interface Environment {
  firebase: {
    projectId: string;
    appId: string,
    storageBucket: string,
    apiKey: string,
    authDomain: string,
    messagingSenderId: string,
  },
  useEmulators: boolean,
  production: boolean,
  apiUrl: string,
  hostUrl: string,
};
