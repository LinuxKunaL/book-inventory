import type { TBook } from "@types_/user";
import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type TDataBook = {
  books: TBook[];
  totalBooks: number;
};
type TContextType = {
  data: TDataBook;
  setData: Dispatch<SetStateAction<TDataBook>>;
  isAddModalOpen: {
    isOpen: boolean;
    editData: TBook;
  };
  setIsAddModalOpen: Dispatch<
    SetStateAction<{ isOpen: boolean; editData: TBook }>
  >;
};

export const UserStates = createContext<TContextType>({
  data: { books: [], totalBooks: 0 },
  setData: () => {},
  isAddModalOpen: { isOpen: false, editData: {} as TBook },
  setIsAddModalOpen: () => {},
});

function UserProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TDataBook>({
    books: [],
    totalBooks: 0,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState<{
    editData: TBook;
    isOpen: boolean;
  }>({
    editData: {} as TBook,
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
