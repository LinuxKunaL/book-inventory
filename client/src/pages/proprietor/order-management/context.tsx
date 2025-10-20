import type { TOrder } from "@types_/user";
import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type TDataBook = {
  orders: TOrder[];
  totalOrders: number;
};
type TContextType = {
  data: TDataBook;
  setData: Dispatch<SetStateAction<TDataBook>>;
  isViewModalOpen: {
    isOpen: boolean;
    data: any;
  };
  setIsViewModalOpen: Dispatch<
    SetStateAction<{ isOpen: boolean; data: any }>
  >;
};

export const UserStates = createContext<TContextType>({
  data: { orders: [], totalOrders: 0 },
  setData: () => {},
  isViewModalOpen: { isOpen: false, data: {} as TOrder },
  setIsViewModalOpen: () => {},
});

function UserProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TDataBook>({
    orders: [],
    totalOrders: 0,
  });
  const [isViewModalOpen, setIsViewModalOpen] = useState<{
    data: TOrder;
    isOpen: boolean;
  }>({
    data: {} as TOrder,
    isOpen: false,
  });

  return (
    <UserStates.Provider
      value={{ data, setData, isViewModalOpen, setIsViewModalOpen }}
    >
      {children}
    </UserStates.Provider>
  );
}

export default UserProvider;
