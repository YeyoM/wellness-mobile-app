import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"
import { getStorage } from "firebase/storage"
import {
  WELLNESS_FIREBASE_API_KEY,
  WELLNESS_FIREBASE_MESSAGE_SENDER_ID,
  WELLNESS_FIREBASE_APP_ID,
  WELLNESS_FIREBASE_MEASUREMENT_ID
} from "@env"

const firebaseConfig = {
  apiKey: WELLNESS_FIREBASE_API_KEY,
  authDomain: "wellness-b37ac.firebaseapp.com",
  projectId: "wellness-b37ac",
  storageBucket: "wellness-b37ac.appspot.com",
  messagingSenderId: WELLNESS_FIREBASE_MESSAGE_SENDER_ID,
  appId: WELLNESS_FIREBASE_APP_ID,
  measurementId: WELLNESS_FIREBASE_MEASUREMENT_ID
};

export const FIREBASE_APP   = initializeApp(firebaseConfig);
export const FIRESTORE      = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH  = getAuth(FIREBASE_APP);