import * as React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import Layout from "../Layouts";
import MemoTable from "../components/MemoTable";

const Donations = () => {
  return (
    <Layout title="Dons" description="Liste de toutes vos dons">
      <MemoTable
        columns={[
          { title: "ID", key: "ref" },
          { title: "Utilisateur", key: "uid" },
          { title: "Somme (CFA)", key: "amount" },
          { title: "Type", key: "type" },
          { title: "Fais le", key: "createdAt" },
        ]}
        data={[
          {
            ref: "#AGH67",
            uid: "Diomande Dro Freddy Junior",
            amount: 5000,
            createdAt: new Date().toString(),
            type: "DIME",
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
})(Donations);
