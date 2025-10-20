import type { TLocation } from "@types_/user";
import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type TDataUser = {
  locations: TLocation[];
  totalLocation: number;
};
type TContextType = {
  data: TDataUser;
  setData: Dispatch<SetStateAction<TDataUser>>;
  isAddModalOpen: {
    isOpen: boolean;
    editData: TLocation;
  };
  setIsAddModalOpen: Dispatch<
    SetStateAction<{ isOpen: boolean; editData: TLocation }>
  >;
};

export const UserStates = createContext<TContextType>({
  data: { locations: [], totalLocation: 0 },
  setData: () => {},
  isAddModalOpen: { isOpen: false, editData: {} as TLocation },
  setIsAddModalOpen: () => {},
});

function UserProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TDataUser>({
    locations: [],
    totalLocation: 0,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState<{
    editData: TLocation;
    isOpen: boolean;
  }>({
    editData: {} as TLocation,
    isOpen: false,
  });

  return (
    <UserStates.Provider
      value={{ data, setData, isAddModalOpen, setIsAddModalOpen }}
    >
      {children}
    </UserStates.Provider>
  );
}

export default UserProvider;
