import { IS_PROD } from "../utils";

var admin = require("firebase-admin");

var serviceAccountDev = require("./genese-dev.json");
var serviceAccountProd = require("./genese-prod.json");

const serviceAccount = IS_PROD ? serviceAccountProd : serviceAccountDev;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
