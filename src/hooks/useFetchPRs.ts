import { useEffect, useState } from 'react';

const env = process.env.NODE_ENV;
const url =
  env === 'development'
    ? 'http://localhost:3000'
    : 'https://tpg-dev-portal-server.fly.dev';

export const useFetchPRs = () => {
  const [fetchedPRs, setFetchedPRs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        response
          .json()
          .then((json) => {
            setFetchedPRs(json);
            return json;
          })
          .catch((error) => {
            setError(error);
          });
        return response;
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return { fetchedPRs, error };
};
