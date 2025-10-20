import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type TContextType = {
  data: string; 
  setData: Dispatch<SetStateAction<string>>;
};

export const ProfileStates = createContext<TContextType>({
  data: "hi",
  setData: () => {}, 
});

function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<string>(""); 
  return (
    <ProfileStates.Provider value={{ data, setData }}>
      {children}
    </ProfileStates.Provider>
  );
}

export default ProfileProvider;
