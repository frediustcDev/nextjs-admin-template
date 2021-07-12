import * as React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import Layout from "../Layouts";
import MemoTable from "../components/MemoTable";
import { IUsersCollection } from "../utils";
import { FIRESTORE_CLIENT } from "../server/FirebaseClient";
import firebase from "firebase";
import moment from "moment";

const Home = () => {
  const [fideles, setFideles] = React.useState<IUsersCollection[]>([]);

  const getFideles = async () => {
    try {
      const _fidelesResult = await FIRESTORE_CLIENT.collection("users")
        .where("access", "==", "FIDELE")
        .get();

      const _fideles: IUsersCollection[] = _fidelesResult.docs.map((doc) => {
        const _data: any = doc.data();

        return {
          _id: doc.id,
          key: doc.id,
          ..._data,
          plan: _data.isPro ? "PRO" : "BASIC",
          createdAt: moment(
            (_data.createdAt as firebase.firestore.Timestamp).toDate()
          ).format("DD MMMM YYYY"),
        };
      });

      setFideles(_fideles);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getFideles();
  }, []);

  console.log(fideles);

  return (
    <Layout title="Fideles" description="Liste de tous vos fideles">
      <MemoTable
        columns={[
          { title: "Nom Complet", key: "fullname" },
          { title: "Email", key: "email" },
          { title: "Numero De Telephone", key: "number" },
          { title: "Plan", key: "plan" },
          { title: "Membre depuis", key: "createdAt" },
        ]}
        data={fideles}
      />
    </Layout>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth/login",
})(Home);
