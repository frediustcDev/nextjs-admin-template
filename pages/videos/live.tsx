import * as React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import { Card, CardBody } from "@paljs/ui/Card";
import { ButtonLink } from "@paljs/ui/Button";
import { useRouter } from "next/router";
import styled from "styled-components";

import Layout from "../../Layouts";

const ErrorStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  small {
    margin-bottom: 3rem;
  }
  h1 {
    margin-bottom: 0.5rem;
  }
  a {
    max-width: 20rem;
  }
`;

const CreateLive: React.FC = () => {
  const router = useRouter();
  return (
    <Layout title="Direct" description="Faire un direct">
      <Card>
        <CardBody>
          <ErrorStyle>
            <h1>Faire un direct</h1>
            <small>Cette fonctionnalite arrive bientot</small>
            <ButtonLink
              fullWidth
              appearance="outline"
              onClick={() => router.push("/")}
              status="Primary"
            >
              Retour a l'accueil
            </ButtonLink>
          </ErrorStyle>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth/login",
})(CreateLive);
