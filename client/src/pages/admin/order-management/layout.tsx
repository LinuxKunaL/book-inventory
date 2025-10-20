import { useContext, useEffect } from "react";
import Filter from "./components/Filter";
import Header from "./components/Header";
import OrdersList from "./components/OrdersList";
import StudentProvider, { UserStates } from "./context";
import ViewOrder from "./components/ViewOrder";
import { useLoaderData } from "react-router";
import { bookData, orderData } from "@data/demo";

function layout() {
  return (
    <StudentProvider>
      <Content />
    </StudentProvider>
  );
}

function Content() {
  const { isViewModalOpen, setData } = useContext(UserStates);
  const loaderResult = useLoaderData();

  useEffect(() => {
    setData({ totalOrders: 10, orders: orderData });
  }, [loaderResult]);

  return (
    <div className="space-y-6 flex flex-col h-full">
      <Header />
      <Filter />
      <OrdersList />
      {isViewModalOpen.isOpen && <ViewOrder />}
    </div>
  );
}

export default layout;
