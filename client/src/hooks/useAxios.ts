import axios, { RawAxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

export const useAxios = <T>(
  config: RawAxiosRequestConfig<any>,
  loadOnStart: boolean = true
): [boolean, T | undefined, string, () => void] => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState('');

  useEffect(() => {
    if (loadOnStart) sendRequest();
  }, []);

  const request = () => {
    sendRequest();
  };

  const sendRequest = () => {
    setData(undefined);
    setLoading(true);
    axios(config)
      .then(response => {
        setError('');
        setData(response.data);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return [loading, data, error, request];
};
