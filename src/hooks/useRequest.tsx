/* eslint-disable no-shadow */
/* eslint-disable no-empty */
import { useEffect, useState } from 'react';

type TParams = {
  // eslint-disable-next-line no-unused-vars
  request: (...params: string[]) => any;
  options: Array<string>;
  memo: any[];
};

type TValue = [data: any, error: boolean, loading: boolean];

const useRequest = ({ request, options, memo }: TParams): TValue => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRequest = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await request(...options);
        setData(res);
      } catch (error: any) {
        setError(true);
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    };
    getRequest();
  }, [...memo]);

  return [data, error, loading];
};

export default useRequest;
