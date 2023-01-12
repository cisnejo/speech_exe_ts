import { useState, useEffect } from 'react';

interface Data {
  id_list: Array<[number]>;
}

interface UsePost {
  data: Data | null;
  error: Error | null;
  loading: boolean;
  postData: (body: object) => Promise<void>;
}

const usePost = (url: string, initialData: Data): UsePost => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line consistent-return
  const postData = async (body: object) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setData(json);
      return json;
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postData };
};

export default usePost;
