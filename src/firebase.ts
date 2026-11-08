import { getApps, initializeApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

const hasCompleteConfig = Object.values(firebaseConfig).every(
  (value) => typeof value === "string" && value.trim().length > 0,
);

export const db: Firestore | null = hasCompleteConfig
  ? getFirestore(
      getApps().find((app) => app.name === "[DEFAULT]") ??
        initializeApp(firebaseConfig),
    )
  : null;
