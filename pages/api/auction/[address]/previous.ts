import { NextApiRequest, NextApiResponse } from "next";
import { getPreviousAuctions } from "data/nouns-builder/auction";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;

  const previousAuctions = await getPreviousAuctions({
    address: address as string,
  });

  const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
  res.setHeader(
    "Cache-Control",
    `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
  );
  res.send(previousAuctions);
};

export default handler;
