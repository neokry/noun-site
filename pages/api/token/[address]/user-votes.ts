import { NextApiRequest, NextApiResponse } from "next";
import { getUserVotes } from "data/nouns-builder/token";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, user, timestamp } = req.query;

  const data = await getUserVotes({
    address: address as `0x${string}`,
    user: user as `0x${string}`,
    timestamp: timestamp ? (timestamp as string) : undefined,
  });

  res.status(200).send(data.toNumber());
};

export default handler;
