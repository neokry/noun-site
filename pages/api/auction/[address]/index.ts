import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { getCurrentAuction } from "data/nouns-builder/auction";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const { address } = req.query;
  const auctionInfo = await getCurrentAuction({ address: address as string });

  const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
  res.setHeader(
    "Cache-Control",
    `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
  );
  res.send(auctionInfo);
};

export default handler;
