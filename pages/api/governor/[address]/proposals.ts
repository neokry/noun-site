import { NextApiRequest, NextApiResponse } from "next";
import { getProposals } from "@/services/nouns-builder/governor";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;

  const proposals = await getProposals({ address: address as `0x${string}` });

  const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
  res.setHeader(
    "Cache-Control",
    `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
  );
  res.send(proposals);
};

export default handler;
