import useAPIBaseURL from "hooks/useAPIBaseURL";
import { AuctionInfo } from "pages/api/auction/[address]";
import useSWR from "swr";

const useAuctionInfo = ({ address }: { address?: string }) => {
  const baseURL = useAPIBaseURL();
  return useSWR<AuctionInfo>(
    address ? `${baseURL}/api/auction/${address}` : undefined
  );
};

export default useAuctionInfo;
