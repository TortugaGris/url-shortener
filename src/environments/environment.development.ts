import { Environment } from "./environment.interface";

export const environment: Environment = {
  firebase: {
    projectId: "demo-url-shortener",
    appId: "1:21377519266:web:703774ca3623dafec991fb",
    storageBucket: "tortugagris-url-shortener.firebasestorage.app",
    apiKey: "AIzaSyDwHIvDlvb05DCQwtG57dtcVH1rVD-jMj0",
    authDomain: "tortugagris-url-shortener.firebaseapp.com",
    messagingSenderId: "21377519266"
  },
  useEmulators: true,
  production: false,
  apiUrl: 'http://127.0.0.1:5001/tortugagris-url-shortener/us-central1/api',
};
