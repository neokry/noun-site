import useAPIBaseURL from "hooks/useAPIBaseURL";
import { useRouter } from "next/router";
import { TokenInfo } from "@/services/nouns-builder/token";
import useSWR from "swr";

const useTokenInfo = ({ tokenId }: { tokenId?: string }) => {
  const {
    query: { site },
  } = useRouter();
  const baseURL = useAPIBaseURL();
  return useSWR<TokenInfo>(
    tokenId && site ? `${baseURL}/api/token/${site}/${tokenId}` : undefined
  );
};

export default useTokenInfo;
