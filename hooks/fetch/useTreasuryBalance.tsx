import { BigNumber } from "ethers";
import useSWR from "swr";

export const useTreasuryBalance = ({
  treasuryContract,
}: {
  treasuryContract?: string;
}) => {
  return useSWR<BigNumber>(
    treasuryContract ? `/api/treasury/${treasuryContract}` : undefined
  );
};
