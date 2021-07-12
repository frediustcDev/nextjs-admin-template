import * as React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import Layout from "../Layouts";
import MemoTable from "../components/MemoTable";
import { ITransactionsCollection } from "../utils";
import { FIRESTORE_CLIENT } from "../server/FirebaseClient";
import firebase from "firebase";
import moment from "moment";

const Transactions = () => {
  const [transactions, setTransactions] = React.useState<
    ITransactionsCollection[]
  >([]);

  const getTransactions = async () => {
    try {
      const _transactionsResult = await FIRESTORE_CLIENT.collection(
        "transactions"
      )
        .where("status", "==", "PAID")
        .get();

      const _transactions: ITransactionsCollection[] = _transactionsResult.docs.map(
        (doc, i) => {
          const _data: any = doc.data();

          return {
            ref: "#" + (i + 1), // todo need to be a 6 char letter in the db
            _id: doc.id,
            key: doc.id,
            ..._data,
            token: _data.token || "+" + _data.number,
            createdAt: moment(
              (_data.createdAt as firebase.firestore.Timestamp).toDate()
            ).format("DD MMMM YYYY"),
          };
        }
      );

      setTransactions(_transactions);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getTransactions();
  }, []);

  return (
    <Layout title="Transactions" description="Liste de toutes vos transactions">
      <MemoTable
        columns={[
          { title: "ID", key: "ref" },
          { title: "Utilisateur", key: "token" },
          { title: "Somme (CFA)", key: "amount" },
          { title: "Type", key: "type" },
          { title: "Mode de payment", key: "provider" },
          { title: "Fais le", key: "createdAt" },
        ]}
        data={transactions}
      />
    </Layout>
  );
};
export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth/login",
})(Transactions);
