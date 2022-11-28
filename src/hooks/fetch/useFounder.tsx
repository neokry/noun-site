import { Founder } from "@/services/nouns-builder/token";
import { useRouter } from "next/router";
import useSWR from "swr";
import useAPIBaseURL from "../useAPIBaseURL";

export const useFounder = () => {
  const {
    query: { site },
  } = useRouter();
  const baseURL = useAPIBaseURL();
  return useSWR<Founder>(
    site ? `${baseURL}/api/token/${site}/founder` : undefined
  );
};

export default useFounder;
