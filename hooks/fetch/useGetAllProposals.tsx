import { Proposal } from "@/services/nouns-builder/governor";
import useSWR from "swr";

export const useGetAllProposals = ({
  governorContract,
}: {
  governorContract?: string;
}) => {
  return useSWR<Proposal[]>(
    governorContract ? `/api/governor/${governorContract}/proposals` : undefined
  );
};
