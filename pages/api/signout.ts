import { NextApiRequest, NextApiResponse } from "next";
import { AUTH_CLIENT } from "../../server/FirebaseClient";

const signOut = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    await AUTH_CLIENT.signOut();

    return res.redirect("/");
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Unexpected error." });
  }
};

export default signOut;
