import { useEffect, useState } from 'react';

export const useFetchPRs = () => {
  const [fetchedPRs, setFetchedPRs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://tpg-dev-portal-server.fly.dev')
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
