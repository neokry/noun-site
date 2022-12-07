import { AuctionInfo } from "data/nouns-builder/auction";
import useSWR from "swr";

const useCurrentAuctionInfo = ({
  auctionContract,
}: {
  auctionContract?: string;
}) => {
  return useSWR<AuctionInfo>(
    auctionContract ? `/api/auction/${auctionContract}` : undefined
  );
};

export default useCurrentAuctionInfo;
