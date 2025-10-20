import type { TAchievements } from "@types_/student";
import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type TAchievementsData = {
  unlock: TAchievements[];
  look: TAchievements["achievement"][];
};

type TContextType = {
  data: TAchievementsData;
  setData: Dispatch<SetStateAction<TAchievementsData>>;
};

export const AchievementsStates = createContext<TContextType>({} as TContextType);

function AchievementsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TAchievementsData>({} as TAchievementsData);
  return (
    <AchievementsStates.Provider value={{ data, setData }}>
      {children}
    </AchievementsStates.Provider>
  );
}

export default AchievementsProvider;
