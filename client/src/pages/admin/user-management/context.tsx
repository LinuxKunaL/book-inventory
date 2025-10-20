import type { TUser } from "@types_/user";
import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type TDataUser = {
  users: TUser[];
  totalUser: number;
};
type TContextType = {
  data: TDataUser;
  setData: Dispatch<SetStateAction<TDataUser>>;
  isAddModalOpen: {
    isOpen: boolean;
    editData: TUser;
  };
  setIsAddModalOpen: Dispatch<
    SetStateAction<{ isOpen: boolean; editData: TUser }>
  >;
};

export const UserStates = createContext<TContextType>({
  data: { users: [], totalUser: 0 },
  setData: () => {},
  isAddModalOpen: { isOpen: false, editData: {} as TUser },
  setIsAddModalOpen: () => {},
});

function UserProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TDataUser>({
    users: [],
    totalUser: 0,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState<{
    editData: TUser;
    isOpen: boolean;
  }>({
    editData: {} as TUser,
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
