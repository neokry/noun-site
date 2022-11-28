import useMetadata from "@/hooks/fetch/useMetadata";
import { useRouter } from "next/router";
import { createContainer } from "unstated-next";
import axios from "axios";
import { Site } from "@prisma/client";
import deepmerge from "deepmerge";
import { useEffect, useState } from "react";

const useMetadataContext = () => {
  const {
    query: { site },
  } = useRouter();
  const { data: initalData, mutate: sendMutate } = useMetadata();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Site | undefined>();

  useEffect(() => {
    if (!data && initalData) setData(initalData);
  }, [initalData, data]);

  const merge = async (newData: Partial<Site>) => {
    mutate(deepmerge(data || {}, newData));
  };

  const mutate = (newData: Site) => {
    setData(newData);
  };

  const save = async () => {
    setLoading(true);
    try {
      const res = axios
        .post<Site>(`/api/site/${site}`, data)
        .then((x) => x.data);
      await sendMutate(res, { optimisticData: data });
    } finally {
      setLoading(false);
    }
  };

  return { merge, mutate, data, save, loading };
};

export default createContainer(useMetadataContext);
