import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type TContextType = {
  isSideMenu: boolean;
  setIsSideMenu: Dispatch<SetStateAction<boolean>>;
};

export const AdminStates = createContext<TContextType>({} as TContextType);

function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isSideMenu, setIsSideMenu] = useState(false);

  return (
    <AdminStates.Provider value={{ isSideMenu, setIsSideMenu }}>
      {children}
    </AdminStates.Provider>
  );
}

export default AdminProvider;
