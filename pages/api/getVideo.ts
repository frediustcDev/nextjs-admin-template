import { NextApiRequest, NextApiResponse } from "next";
import Mux from "@mux/mux-node";
import { MUX_TOKEN_ID, MUX_TOKEN_SECRET } from "../../utils";

const { Video } = new Mux(MUX_TOKEN_ID, MUX_TOKEN_SECRET);

export default async function getVideo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const upload = await Video.Uploads.get(req.body.id);

    console.log(upload);

    if (upload.error) throw upload.error;

    const video = await Video.Assets.get(upload.asset_id);

    if (video.errors) throw video.errors;

    res.send({ success: true, data: video });
  } catch (error) {
    res.send({ success: false, data: error });
  }
}
