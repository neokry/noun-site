import { router, procedure } from "@/server/trpc";
import { z } from "zod";
import { BuilderSDK } from "@buildersdk/sdk";
import DefaultProvider from "@/utils/DefaultProvider";
import { BigNumber } from "ethers";

const { auction } = BuilderSDK.connect({ signerOrProvider: DefaultProvider });

export type AuctionInfo = {
  tokenId: string;
  highestBid: string;
  highestBidder: `0x${string}`;
  startTime: number;
  endTime: number;
  settled: boolean;
};

const currentAuction = procedure
  .input(
    z.object({
      auctionAddress: z.string(),
    })
  )
  .query(async ({ input }) => {
    const auctionInfo = await auction({
      address: input.auctionAddress,
    }).auction();

    return {
      tokenId: auctionInfo.tokenId.toHexString(),
      highestBid: auctionInfo.highestBid.toHexString(),
      highestBidder: auctionInfo.highestBidder,
      startTime: auctionInfo.startTime,
      endTime: auctionInfo.endTime,
      settled: auctionInfo.settled,
    } as AuctionInfo;
  });

export const auctionRouter = router({ currentAuction });
