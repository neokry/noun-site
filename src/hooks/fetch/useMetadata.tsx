import { Site } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";
import useAPIBaseURL from "../useAPIBaseURL";

export const useMetadata = () => {
  const {
    query: { site },
  } = useRouter();
  const baseURL = useAPIBaseURL();
  return useSWR<Site>(site ? `${baseURL}/api/site/${site}` : undefined);
};

export default useMetadata;
