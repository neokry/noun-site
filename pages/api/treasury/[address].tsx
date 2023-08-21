import { NextApiRequest, NextApiResponse } from "next";
import DefaultProvider from "utils/DefaultProvider";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;
  const treasuryBalance = await DefaultProvider.getBalance(address as string);

  const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
  res.setHeader(
    "Cache-Control",
    `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
  );
  res.send(treasuryBalance);
};

export default handler;
