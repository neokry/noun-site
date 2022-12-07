import { AuctionInfo } from "data/nouns-builder/auction";
import useSWR from "swr";

const useAuctionInfo = ({ auctionContract }: { auctionContract?: string }) => {
  return useSWR<AuctionInfo>(
    auctionContract ? `/api/auction/${auctionContract}` : undefined
  );
};

export default useAuctionInfo;
