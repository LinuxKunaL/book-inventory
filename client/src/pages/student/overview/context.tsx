import type { TOverviewData } from "@types_/student";
import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type TContextType = {
  data: TOverviewData;
  setData: Dispatch<SetStateAction<TOverviewData>>;
};

export const OverviewStates = createContext<TContextType>({} as TContextType);

function OverviewProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TOverviewData>({} as TOverviewData);
  return (
    <OverviewStates.Provider value={{ data, setData }}>
      {children}
    </OverviewStates.Provider>
  );
}

export default OverviewProvider;
