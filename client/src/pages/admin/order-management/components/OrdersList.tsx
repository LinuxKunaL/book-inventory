import { IoMdEye } from "react-icons/io";
import { UserStates } from "../context";
import { useContext, useEffect, useState } from "react";
import Span from "@components/interfaces/Span";
import { useSearchParams } from "react-router";
import Pagination from "@components/interfaces/Pagination";
import { Badge, Table, Tooltip, IconButton } from "@radix-ui/themes";
import ItemsNotFound from "@components/others/ItemsNotFound";
import { getStatusColor } from "@utils/colors/getStatusColor";
import api from "@servicesOther/axios.api";
import { MdDelete } from "react-icons/md";
import { toast } from "@functions/toast/toast";

export interface OrderItem {
  bookId: string;
  name: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  totalQuantity: number;
  totalPrice: number;
  status: "pending" | "completed" | "cancelled" | string; // Adjust as needed
  createdBy: any;
  createdAt: string; // or `Date` if parsed
  updatedAt: string; // or `Date`
  __v: number;
}

function OrdersList() {
  const { data, setIsViewModalOpen } = useContext(UserStates);
  const [pageParam, setPageParam] = useSearchParams({ page: "1" });
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get(`/admin/getOrders`).then((res) => {
      setOrders(res.data);
    });
  }, []);

  const handleViewDetails = (data: any) => {
    setIsViewModalOpen({ isOpen: true, data: data });
  };

  const handleCancelOrder = (data: any) => {
    api.post(`/admin/deleteOrder`, { id: data._id }).then((res) => {
      toast.success(res.data.message);
      window.location.reload();
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col space-y-1.5 pt-6">
          <h3 className="text-xl sm:text-2xl font-semibold leading-none tracking-tight">
            Orders
          </h3>
          <p className="text-sm text-muted-foreground">
            Showing {data.orders?.length} of {data.totalOrders} orders
          </p>
        </div>
        <Pagination
          length={data.totalOrders}
          setPage={setPageParam}
          page={pageParam}
        />
      </div>
      {orders.length > 0 && (
        <div className="pt-6">
          <div className="space-y-4 text-nowrap overflow-x-auto">
            <Table.Root
              variant="surface"
              className="dark:!bg-gray-800 !bg-white !border-[1px] border-gray-200 dark:!border-gray-700"
            >
              <Table.Header>
                <Table.Row>
                  {[
                    "Sr No",
                    "Distributor Name",
                    "Order by",
                    "Status",
                    "Order Date",
                    "Items",
                    "Total Amount",
                    "Actions",
                  ].map((head) => (
                    <Table.ColumnHeaderCell key={head}>
                      {head}
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {orders.map((order, index) => (
                  <Table.Row align="center">
                    <Table.Cell>
                      <Span>{index + 1}</Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span>Tejas wagh</Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span>{order.createdBy.fullname}</Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span>
                        <Badge color={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span>{new Date(order.createdAt).toLocaleString()}</Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span className="font-semibold">
                        {order.totalQuantity}
                      </Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span className="font-semibold">
                        {order.totalPrice}.00 ₹
                      </Span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-2">
                        <Tooltip content="View Details">
                          <IconButton
                            onClick={() => handleViewDetails(order)}
                            radius="medium"
                            color="sky"
                            variant="soft"
                          >
                            <IoMdEye size={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Cancel Order">
                          <IconButton
                            onClick={() => handleCancelOrder(order)}
                            radius="medium"
                            color="red"
                            variant="soft"
                          >
                            <MdDelete size={16} />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </div>
        </div>
      )}
      {data.orders.length === 0 && (
        <ItemsNotFound
          type="student"
          title="No students found"
          className="h-full"
        />
      )}
      <div className="h-7" />
    </div>
  );
}

export default OrdersList;
