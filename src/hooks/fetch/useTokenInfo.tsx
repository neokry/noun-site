import { ContractInfo } from "@/server/routers/token";
import useAPIBaseURL from "hooks/useAPIBaseURL";
import { useRouter } from "next/router";
import useSWR from "swr";

const useTokenInfo = ({ tokenId }: { tokenId?: string }) => {
  const {
    query: { site },
  } = useRouter();
  const baseURL = useAPIBaseURL();
  return useSWR<ContractInfo>(
    tokenId ? `${baseURL}/api/token/${site}/${tokenId}` : undefined
  );
};

export default useTokenInfo;
