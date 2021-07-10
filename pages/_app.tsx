import "../styles/global.css";
import initAuth from "../server/initAuth";
import moment from "moment";

initAuth();

moment.locale("fr");
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
