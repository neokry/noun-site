import { NextApiRequest, NextApiResponse } from "next";
import { getBalanceOf } from "data/nouns-builder/token";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, user } = req.query;
  const balance = await getBalanceOf({
    address: address as "0x${string}",
    user: user as "0x${string}",
  });

  const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
  res.setHeader(
    "Cache-Control",
    `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
  );
  res.send(balance.toNumber());
};

export default handler;
