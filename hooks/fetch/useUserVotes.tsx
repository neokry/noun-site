import { TOKEN_CONTRACT } from "constants/addresses";
import useSWR from "swr";
import { useAccount } from "wagmi";

export const useUserVotes = (params?: { timestamp: number }) => {
  const { address: user } = useAccount();

  return useSWR<number>(
    user
      ? `/api/token/${TOKEN_CONTRACT}/user-votes?user=${user}${
          params?.timestamp ? `&timestamp=${params.timestamp}` : ""
        }`
      : undefined
  );
};
