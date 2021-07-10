import * as React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import Layout from "../Layouts";
import MemoTable from "../components/MemoTable";

const Subscriptions = () => {
  return (
    <Layout
      title="Souscriptions"
      description="Liste de toutes vos souscriptions"
    >
      <MemoTable
        columns={[
          { title: "ID", key: "ref" },
          { title: "Utilisateur", key: "uid" },
          { title: "Somme (CFA)", key: "amount" },
          { title: "Duree", key: "duration" },
          { title: "Fais le", key: "createdAt" },
          { title: "Expire le", key: "expireOn" },
        ]}
        data={[
          {
            ref: "#AGH67",
            uid: "Diomande Dro Freddy Junior",
            amount: 5000,
            duration: 1,
            type: "SOUSCRIPTION",
            createdAt: new Date().toString(),
            expireOn: new Date().toString(),
            key: "user1",
          },
        ]}
      />
    </Layout>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth/login",
})(Subscriptions);
