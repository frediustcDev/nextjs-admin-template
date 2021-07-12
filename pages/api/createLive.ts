import { NextApiRequest, NextApiResponse } from "next";
import Mux from "@mux/mux-node";
import { MUX_TOKEN_ID, MUX_TOKEN_SECRET } from "../../utils";

const { Video } = new Mux(MUX_TOKEN_ID, MUX_TOKEN_SECRET);

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const live = await Video.LiveStreams.create({
      reduced_latency: true,
      playback_policy: "public",
      new_asset_settings: { playback_policy: "public" },
    });

    console.log(live);

    res.send({ success: true, data: live });
  } catch (error) {
    res.send({ success: false, data: error });
  }
}
