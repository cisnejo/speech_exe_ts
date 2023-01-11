import { useEffect, useState } from 'react';
import ICommandProps from './ICommandProps';
import ICommand from './ICommand';

const useFetch = (url: any) => {
  const [data, setData] = useState<ICommand[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function FetchData(urlNew: any) {
      try {
        const response = await fetch(urlNew);
        const newData = await response.json();
        setData(JSON.parse(newData));
        setIsPending(false);
        setError('null');
      } catch (newError: any) {
        setIsPending(false);
        setError(newError);
      }
    }
    FetchData(url);
  }, [url]);

  return { data, isPending, error };
};
export default useFetch;
