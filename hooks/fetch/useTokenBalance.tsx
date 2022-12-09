import { BigNumber } from "ethers";
import useSWR from "swr";
import { useAccount } from "wagmi";

export const useTokenBalance = ({
  tokenContract,
}: {
  tokenContract: string;
}) => {
  const { address } = useAccount();
  return useSWR<number>(`/api/token/${tokenContract}/balance/${address}`);
};
