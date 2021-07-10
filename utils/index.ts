const FIREBASE_CONFIG_DEV = {
  apiKey: "AIzaSyBxNw3uB1kd5A7VMhHe0acewNEQgFrHjiY",
  authDomain: "genese-dev.firebaseapp.com",
  projectId: "genese-dev",
  storageBucket: "genese-dev.appspot.com",
  messagingSenderId: "769973560528",
  appId: "1:769973560528:web:87511fd82ecb51316aead5",
  measurementId: "G-GZNPDDNNEW",
};

const FIREBASE_CONFIG_PROD = {
  apiKey: "AIzaSyCJCKbqHHo82-Ta6zVp1YYJblERX5fhBQI",
  authDomain: "genese-prod-9d981.firebaseapp.com",
  projectId: "genese-prod-9d981",
  storageBucket: "genese-prod-9d981.appspot.com",
  messagingSenderId: "973635749513",
  appId: "1:973635749513:web:f4501e632ad9d2d562e858",
  measurementId: "G-GEC88FYT4K",
};

export const IS_PROD = process.env.NODE_ENV === "production";

export const FIREBASE_CONFIG = IS_PROD
  ? FIREBASE_CONFIG_DEV
  : FIREBASE_CONFIG_PROD;
