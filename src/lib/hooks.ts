import { useEffect, useState } from "react";
import { TJobItem, TJobItemDetails } from "./types";
import { BASE_API_URL } from "./constants";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const data = await res.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };

    fetchData();
  }, [searchText]);
  return [jobItemsSliced, isLoading] as const;
}

export function useJobItemDetails(id: number | null) {
  const [jobItemDetails, setJobItemDetails] = useState< TJobItemDetails | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const res = await fetch(`${BASE_API_URL}/${id}`);
      const data = await res.json();
      setJobItemDetails(data.jobItem);
    };
    fetchData();
  }, [id]);

  return jobItemDetails;
}
export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return activeId;
}
