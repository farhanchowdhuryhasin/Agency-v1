import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "affable-framing-jcf5x",
  appId: "1:373737712364:web:21eb5d9ca6437d2ccc13c9",
  apiKey: "AIzaSyAZHGDh8EYZuFHgwQtlGP9sDJhqMvDV3K0",
  authDomain: "affable-framing-jcf5x.firebaseapp.com",
  storageBucket: "affable-framing-jcf5x.firebasestorage.app",
  messagingSenderId: "373737712364",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-outreachlinkagen-0e863bc3-fc6f-4b1d-858d-c71df62806a0");
