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

export const CATEGORIES = {
  predications: "Prédications",
  seminaires: "Séminaires",
  "l-ecole-du-potier": "L'école du potier",
  "le-culte-des-leaders": "Le culte des leaders",
  "restauration-des-fondements": "Restauration des fondements",
  "cultes-d-actions-de-grace": "Cultes d'actions de grâce",
  "atmosphere-de-miracles": "Atmosphère de miracles",
};

export const IS_PROD = process.env.NODE_ENV === "production";

export const FIREBASE_CONFIG = IS_PROD
  ? FIREBASE_CONFIG_PROD
  : FIREBASE_CONFIG_DEV;

export const BASE_URL = IS_PROD
  ? "https://genese-admin-v2.vercel.app"
  : "http://localhost:3000";

export const MUX_TOKEN_ID = IS_PROD
  ? process.env.MUX_TOKEN_ID_MINE_PROD
  : process.env.MUX_TOKEN_ID;

export const MUX_TOKEN_SECRET = IS_PROD
  ? process.env.MUX_TOKEN_SECRET_MINE_PROD
  : process.env.MUX_TOKEN_SECRET;

export interface IMemoTableColumn {
  key: string;
  title: string;
}

export interface IMemoTableData {
  key: string;
  [columnKey: string]: any;
}

export interface IMemoTableProps {
  columns: IMemoTableColumn[];
  data: IMemoTableData[];
}

export interface IUsersCollection extends IMemoTableData {
  access: "FIDELE" | "ADMIN";
  createdAt: string;
  fullname: string;
  number: string;
  email: string;
  _id?: string;
  country?: {
    name?: string;
  };
}

export interface ITransactionsCollection extends IMemoTableData {
  amount: number;
  country: string;
  createdAt: string;
  currency: "XOF" | "USD";
  network: "ORANGE" | "MOOV" | "MTN" | "PAYPAL" | "MASTER_CARD" | "VISA_CARD";
  token: string;
  number: string;
  provider: "MOBILE_MONEY" | "PAYPAL" | "CREDIT_CARD";
  status: "PENDING" | "PAID" | "FAILED";
  type: "DIME" | "DONATION" | "CONSTRUCTION";
  uid: string;
}

export interface IVideosCollection {
  _id?: string;
  aspectRatio: string;
  category: string;
  coverURL: string;
  createdAt: string;
  description: string;
  duration: number;
  muxUploadID: string;
  promote: boolean;
  tags: string[];
  title: string;
  trailer: string;
  uid: string;
  videoURL: string;
}
