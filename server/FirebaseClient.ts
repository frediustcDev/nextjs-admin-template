import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { FIREBASE_CONFIG } from "../utils";

if (firebase.apps.length === 0) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

export const FIRESTORE_CLIENT = firebase.firestore();
export const AUTH_CLIENT = firebase.auth();
export const STORAGE_CLIENT = firebase.storage();
export const FIREBASE_CLIENT = firebase;
