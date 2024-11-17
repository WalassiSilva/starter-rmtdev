import { createContext } from "react";
import { useActiveId } from "../hooks/useActiveId";

type ActiveIdcontextType = { activeId: number | null };

export const ActiveIdContext = createContext<ActiveIdcontextType | null>(null);

export default function ActiveIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeId = useActiveId();

  return (
    <ActiveIdContext.Provider value={{ activeId }}>
      {children}
    </ActiveIdContext.Provider>
  );
}
