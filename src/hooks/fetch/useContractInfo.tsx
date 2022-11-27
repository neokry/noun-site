import useAPIBaseURL from "hooks/useAPIBaseURL";
import { useRouter } from "next/router";
import { ContractInfo } from "pages/api/token/[address]";
import useSWR from "swr";

const useContractInfo = () => {
  const {
    query: { site },
  } = useRouter();
  const baseURL = useAPIBaseURL();
  return useSWR<ContractInfo>(`${baseURL}/api/token/${site}`);
};

export default useContractInfo;
