import { useEffect, useState } from 'react';
import { URL_CONSTANTS } from '../constants';

const { base: url } = URL_CONSTANTS;

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
