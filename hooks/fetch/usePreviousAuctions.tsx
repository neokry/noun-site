import useSWR from "swr";
import { PreviousAuction } from "@/services/nouns-builder/auction";

export const usePreviousAuctions = ({
  auctionContract,
}: {
  auctionContract?: string;
}) => {
  return useSWR<PreviousAuction[]>(`/api/auction/${auctionContract}/previous`);
};
