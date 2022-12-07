import { ContractInfo } from "data/nouns-builder/token";
import { TOKEN_CONTRACT } from "constants/addresses";
import useSWR from "swr";

const useContractInfo = () => {
  return useSWR<ContractInfo>(`/api/token/${TOKEN_CONTRACT}`);
};

export default useContractInfo;
