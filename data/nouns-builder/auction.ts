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

export type PreviousAuction = {
  tokenId: string;
  winner: `0x${string}`;
  amount: string;
};

const { auction } = BuilderSDK.connect({ signerOrProvider: DefaultProvider });

export const getCurrentAuction = async ({ address }: { address: string }) => {
  const { tokenId, highestBid, highestBidder, startTime, endTime, settled } =
    await auction({
      address,
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

export const getPreviousAuctions = async ({ address }: { address: string }) => {
  const auctionContract = auction({ address });
  const filter = auctionContract.filters.AuctionSettled(null, null, null);
  const events = await auctionContract.queryFilter(filter);
  return events.map(
    (x) =>
      ({
        tokenId: x.args?.tokenId.toHexString(),
        winner: x.args?.winner,
        amount: x.args?.amount.toHexString(),
      } as PreviousAuction)
  );
};
