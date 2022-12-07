import { NextApiRequest, NextApiResponse } from "next";
import { getTreasury } from "data/nouns-builder/auction";
import DefaultProvider from "utils/DefaultProvider";
import { BigNumber } from "ethers";

export type TreasuryResponse = {
  balance: BigNumber;
  address: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;
  const treasuryAddress = await getTreasury({ address: address as string });
  const treasuryBalance = await DefaultProvider.getBalance(treasuryAddress);

  const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
  res.setHeader(
    "Cache-Control",
    `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
  );
  res.send({ balance: treasuryBalance, address: treasuryAddress });
};

export default handler;
