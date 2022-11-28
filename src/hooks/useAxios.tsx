import axios from "axios";
import { useCallback, useState } from "react";

export type UseAxiosType<T> = {
  loading: boolean;
  error: Error | undefined;
  result: T | undefined;
  success: boolean;
  send: () => Promise<void>;
};

export enum AxiosRequestType {
  POST = "post",
  PUT = "put",
}

const useAxios = <T,>({
  url,
  requestType = AxiosRequestType.POST,
  data,
  onSettled,
}: {
  url: string;
  requestType?: AxiosRequestType;
  data?: any;
  onSettled?: () => void;
}): UseAxiosType<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const [result, setResult] = useState<T | undefined>();

  const send = useCallback(async () => {
    try {
      setLoading(true);

      let res;
      switch (requestType) {
        case AxiosRequestType.POST:
          res = await axios.post(url, data);
          break;
        case AxiosRequestType.PUT:
          res = await axios.put(url, data);
          break;
      }

      setResult(res.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
      onSettled?.();
    }
  }, [requestType, setResult, setLoading, setError, onSettled, data, url]);

  return { loading, error, result, success: !!result, send };
};

export default useAxios;
