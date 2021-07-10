// ./initAuth.js
import { init } from "next-firebase-auth";
import { FIREBASE_CONFIG, IS_PROD } from "../utils";

const initAuth = () => {
  init({
    authPageURL: "/auth",
    appPageURL: "/",
    loginAPIEndpoint: "/api/login", // required
    logoutAPIEndpoint: "/api/logout", // required
    // firebaseAuthEmulatorHost: "localhost:9099",
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: {
        projectId: IS_PROD
          ? process.env.FIREBASE_PROJECT_ID_PROD
          : process.env.FIREBASE_PROJECT_ID_DEV,
        clientEmail: IS_PROD
          ? process.env.FIREBASE_EMAIL_PROD
          : process.env.FIREBASE_EMAIL_DEV,
        // The private key must not be accesssible on the client side.
        privateKey: IS_PROD
          ? process.env.FIREBASE_PRIVATE_KEY_PROD
          : process.env.FIREBASE_PRIVATE_KEY_DEV,
      },
      databaseURL: "https://genese-prod-9d981.firebaseio.com",
    },
    firebaseClientInitConfig: FIREBASE_CONFIG,
    cookies: {
      name: "Genese", // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: IS_PROD, // set this to false in local (non-HTTPS) development
      signed: true,
    },
  });
};

export default initAuth;
