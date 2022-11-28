import useAPIBaseURL from "hooks/useAPIBaseURL";
import { useRouter } from "next/router";
import { ContractInfo } from "@/services/nouns-builder/token";
import useSWR from "swr";

const useContractInfo = () => {
  const {
    query: { site },
  } = useRouter();
  const baseURL = useAPIBaseURL();
  return useSWR<ContractInfo>(
    site ? `${baseURL}/api/token/${site}` : undefined
  );
};

export default useContractInfo;
