import { NextApiRequest, NextApiResponse } from "next";
import { getProposalThreshold } from "data/nouns-builder/governor";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;
  const data = await getProposalThreshold({
    address: address as string,
  });

  res.status(200).send(data.toNumber());
};

export default handler;
