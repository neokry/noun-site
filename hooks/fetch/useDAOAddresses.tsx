import { DAOAddresses } from "@/services/nouns-builder/manager";
import useSWR from "swr";

export const useDAOAddresses = ({
  tokenContract,
}: {
  tokenContract?: string;
}) => {
  return useSWR<DAOAddresses>(
    tokenContract ? `/api/manager/addresses/${tokenContract}` : undefined
  );
};
