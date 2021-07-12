import { NextApiRequest, NextApiResponse } from "next";
import Mux from "@mux/mux-node";
import { MUX_TOKEN_ID, MUX_TOKEN_SECRET } from "../../utils";

const { Video } = new Mux(MUX_TOKEN_ID, MUX_TOKEN_SECRET);

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const upload = await Video.Uploads.create({
      cors_origin: "*", //make it specific later
      new_asset_settings: {
        playback_policy: "public",
      },
    });

    console.log(upload);

    res.send({ success: true, data: upload });
  } catch (error) {
    res.send({ success: false, data: error });
  }
}
