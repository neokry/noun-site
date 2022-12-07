import { TreasuryResponse } from "pages/api/auction/[address]/treasury";
import useSWR from "swr";

const useTreasuryBalance = ({
  auctionContract,
}: {
  auctionContract?: string;
}) => {
  return useSWR<TreasuryResponse>(
    auctionContract ? `/api/auction/${auctionContract}/treasury` : undefined
  );
};

export default useTreasuryBalance;
