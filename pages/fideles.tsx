import * as React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";

import Layout from "../Layouts";
import MemoTable from "../components/MemoTable";

const Home = () => {
  return (
    <Layout title="Fideles" description="Liste de tous vos fideles">
      <MemoTable
        columns={[
          { key: "name", title: "Nom Complet" },
          { title: "Email", key: "email" },
          { title: "Numero De Telephone", key: "number" },
          { title: "Plan", key: "plan" },
          { title: "Membre depuis", key: "createdAt" },
        ]}
        data={[
          {
            name: "Diomande Dro Freddy Junior",
            email: "frediustcdev@gmail.com",
            number: "+2250708517414",
            plan: "PRO",
            createdAt: new Date().toString(),
            key: "user1",
          },
          {
            name: "Diomande Dro Freddy Junior",
            email: "frediustcdev@gmail.com",
            number: "+2250708517414",
            plan: "PRO",
            createdAt: new Date().toString(),
            key: "user2",
          },
        ]}
      />
    </Layout>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth/login",
})(Home);
