import { BuilderSDK } from "@buildersdk/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import DefaultProvider from "@/utils/DefaultProvider";
import NextCors from "nextjs-cors";

const { auction } = BuilderSDK.connect({ signerOrProvider: DefaultProvider });

export type AuctionInfo = {
  tokenId: string;
  highestBid: string;
  highestBidder: `0x${string}`;
  startTime: number;
  endTime: number;
  settled: boolean;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const { address } = req.query;

  const { tokenId, highestBid, highestBidder, startTime, endTime, settled } =
    await auction({
      address: address as string,
    }).auction();

  const auctionInfo = {
    tokenId: tokenId.toHexString(),
    highestBid: highestBid.toHexString(),
    highestBidder,
    startTime,
    endTime,
    settled,
  } as AuctionInfo;

  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate=59");
  res.send(auctionInfo);
};

export default handler;
