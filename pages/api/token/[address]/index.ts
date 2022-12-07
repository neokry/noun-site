import { NextApiRequest, NextApiResponse } from "next";
import { getContractInfo } from "data/nouns-builder/token";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;
  const contractInfo = await getContractInfo({ address: address as string });

  const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
  res.setHeader(
    "Cache-Control",
    `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
  );
  res.send(contractInfo);
};

export default handler;
