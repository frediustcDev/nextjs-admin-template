import * as React from "react";
import Layout from "../Layouts";
import MemoTable from "../components/MemoTable";

const Transactions = () => {
  return (
    <Layout title="Transactions" description="Liste de toutes vos transactions">
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
            type: "SOUSCRIPTION",
            createdAt: new Date().toString(),
            key: "user1",
          },
        ]}
      />
    </Layout>
  );
};
export default Transactions;
