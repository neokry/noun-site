import { BuilderSDK } from "@buildersdk/sdk";
import DefaultProvider from "@/utils/DefaultProvider";

export type AuctionInfo = {
  tokenId: string;
  highestBid: string;
  highestBidder: `0x${string}`;
  startTime: number;
  endTime: number;
  settled: boolean;
};

const { auction } = BuilderSDK.connect({ signerOrProvider: DefaultProvider });

export const getCurrentAuction = async ({ address }: { address: string }) => {
  const { tokenId, highestBid, highestBidder, startTime, endTime, settled } =
    await auction({
      address: address as string,
    }).auction();

  return {
    tokenId: tokenId.toHexString(),
    highestBid: highestBid.toHexString(),
    highestBidder,
    startTime,
    endTime,
    settled,
  } as AuctionInfo;
};

export const getTreasury = async ({ address }: { address: string }) => {
  return await auction({
    address: address as string,
  }).treasury();
};
