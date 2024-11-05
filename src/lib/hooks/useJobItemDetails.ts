import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../constants";
import {  TJobItemDetails } from "../types";

type JobItemApiResponse = {
  public: boolean;
  jobItem: TJobItemDetails;
};

async function fetchJobItem(id: number): Promise<JobItemApiResponse> {
  const res = await fetch(`${BASE_API_URL}/${id}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }

  const data = await res.json();
  return data;
}

export function useJobItemDetails(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item-details",id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: (error) => {
        console.log(error);
      },
    }
  );
  return {
    jobItemDetails: data?.jobItem,
    isLoading: isInitialLoading,
  } as const;
}
