import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY || 'AIzaSyAtJqaOGJJkeflv5o6B9ps8brp9NAsf_Jg',
  authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN || 'euroziel-b17b4.firebaseapp.com',
  projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID || 'euroziel-b17b4',
  storageBucket: (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET || 'euroziel-b17b4.firebasestorage.app',
  messagingSenderId: (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID || '1018047278959',
  appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID || '1:1018047278959:web:3a64760882fbae8553429a',
  measurementId: (import.meta as any).env?.VITE_FIREBASE_MEASUREMENT_ID || 'G-PZ4R97246C',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
