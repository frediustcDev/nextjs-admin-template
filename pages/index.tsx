import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { withAuthUser, AuthAction } from "next-firebase-auth";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/fideles");
  }, []);

  return <div />;
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth/login",
})(Index);
