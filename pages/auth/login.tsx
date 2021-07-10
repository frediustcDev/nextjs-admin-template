import { Button } from "@paljs/ui/Button";
import { InputGroup } from "@paljs/ui/Input";
import { Checkbox } from "@paljs/ui/Checkbox";
import * as React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import Link from "next/link";

import Auth, { Group } from "../../components/Auth";
import Socials from "../../components/Auth/Socials";
import Layout from "../../Layouts";

const Login: React.FC = () => {
  const onCheckbox = () => {
    // v will be true or false
  };
  return (
    <Layout title="Login">
      <Auth title="Login" subTitle="Hello! Login with your email">
        <form>
          <InputGroup fullWidth>
            <input type="email" placeholder="Email Address" />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="password" placeholder="Password" />
          </InputGroup>
          <Group>
            <Checkbox checked onChange={onCheckbox}>
              Remember me
            </Checkbox>
          </Group>
          <Button status="Success" type="button" shape="SemiRound" fullWidth>
            Login
          </Button>
        </form>
      </Auth>
    </Layout>
  );
};
export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Login);
