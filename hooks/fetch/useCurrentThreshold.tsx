import useSWR from "swr";

export const useCurrentThreshold = ({
  governorContract,
}: {
  governorContract?: `0x${string}`;
}) => {
  return useSWR<number>(
    governorContract
      ? `/api/governor/${governorContract}/current-threshold`
      : undefined
  );
};
