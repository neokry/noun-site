import { NextApiRequest, NextApiResponse } from "next";
import { getAddresses } from "data/nouns-builder/manager";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;

  const daoAddresses = await getAddresses({
    tokenAddress: address as `0x${string}`,
  });

  const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
  res.setHeader(
    "Cache-Control",
    `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
  );
  res.send(daoAddresses);
};

export default handler;
