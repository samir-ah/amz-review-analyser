import { useState, useCallback, useRef, useEffect } from 'react';
import axios, { RawAxiosRequestConfig } from 'axios';
import { useAuth } from '../context/AuthContext';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authContext = useAuth();
  const activeHttpRequests = useRef<AbortController[]>([]);

  const axiosRequest = useCallback(
    async (url: string, config?: RawAxiosRequestConfig<any>) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response: any = await axios(url, {
          baseURL: import.meta.env.VITE_BACKEND_URL,
          ...config,
          headers: {
            ...config?.headers,
            Accept: 'application/json',
            ...(authContext.token && {
              Authorization: `Bearer ${authContext.token}`,
            }),
          },
          signal: httpAbortCtrl.signal,
        } as RawAxiosRequestConfig<any>);
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl,
        );
        // console.log(response);
        setIsLoading(false);
        return response;
      } catch (error: any) {
        setIsLoading(false);
        throw error.response;
      }
    },
    [authContext.token],
  );

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, axiosRequest };
};
