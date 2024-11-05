import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../constants";
import { TJobItem } from "../types";

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: TJobItem[];
};

async function fetchJobItems(searchText: string): Promise<JobItemsApiResponse> {
  const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }
  const data = await res.json();
  return data;
}

export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 100 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: (error) => {
        console.log(error);
      },
    }
  );
  return {
    jobItems: data?.jobItems,
    isLoading: isInitialLoading,
  };
}
