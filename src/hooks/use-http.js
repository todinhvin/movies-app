import { useCallback, useState } from "react";

const useHttp = (requestFunc) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const sendRequest = useCallback(
    async (requestData) => {
      try {
        setIsLoading(true);
        const responseData = await requestFunc(requestData);
        if (responseData) {
          setHasMore(responseData.length > 0);
        }
        setData(responseData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [requestFunc]
  );
  return {
    data,
    isLoading,
    error,
    hasMore,
    sendRequest,
  };
};

export default useHttp;
