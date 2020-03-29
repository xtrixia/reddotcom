/**
 * @file Firebase config
 */

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

// Initialize firebase
firebase.initializeApp(config);
// Initialize authentication
export const authentication = firebase.auth();
/* List: firebase auth provider */
export const googleProvider: firebase.auth.GoogleAuthProvider_Instance = new firebase.auth.GoogleAuthProvider();
export const twitterProvider: firebase.auth.TwitterAuthProvider_Instance = new firebase.auth.TwitterAuthProvider();

export type AuthProviderType =
  | firebase.auth.GoogleAuthProvider_Instance
  | firebase.auth.TwitterAuthProvider_Instance;

export const database = {
  // CREATE
  create: (
    ref: string,
    variables: { [key: string]: any },
    callback: (error: Error | null) => void | undefined
  ) =>
    firebase
      .database()
      .ref(ref)
      .set(variables, callback),
  // READ
  read: (ref: string) => firebase.database().ref(ref),
  // DELETE
  delete: (ref: string) =>
    firebase
      .database()
      .ref(ref)
      .remove()
};
