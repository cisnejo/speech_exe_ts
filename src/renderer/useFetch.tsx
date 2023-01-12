import { useEffect, useState } from 'react';
import ICommand from './ICommand';

const useFetch = (url: any) => {
  const [data, setData] = useState<ICommand[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function FetchData(urlNew: any) {
      setIsPending(true);
      try {
        // artificial timer to make the loading not so jarring
        setTimeout(async () => {
          const response = await fetch(urlNew);
          const newData = await response.json();
          setData(JSON.parse(newData));
          setIsPending(false);
          setError('null');
        }, 650);
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
