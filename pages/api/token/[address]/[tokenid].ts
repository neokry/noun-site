import { NextApiRequest, NextApiResponse } from "next";
import { getTokenInfo } from "data/nouns-builder/token";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, tokenid } = req.query;
  const tokenInfo = await getTokenInfo({
    address: address as string,
    tokenid: tokenid as string,
  });

  const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
  res.setHeader(
    "Cache-Control",
    `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
  );
  res.send(tokenInfo);
};

export default handler;
