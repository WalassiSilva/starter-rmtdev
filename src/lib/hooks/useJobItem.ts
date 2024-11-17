import { useQueries, useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../constants";
import { TJobItemDetails } from "../types";
import { handleError } from "../utils";

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

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    }
  );
  return {
    jobItemDetails: data?.jobItem,
    isLoading: isInitialLoading,
  } as const;
}
export function useJobItems(ids: number[]) {
  const res = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    })),
  });
  const jobItems = res
    .map((item) => item.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined);
  const isLoading = res.some((item) => item.isLoading);

  return { jobItems, isLoading } as const;
}
