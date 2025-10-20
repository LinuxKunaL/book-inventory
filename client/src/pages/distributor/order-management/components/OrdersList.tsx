import { IoMdEye } from "react-icons/io";
import { UserStates } from "../context";
import { useContext } from "react";
import Span from "@components/interfaces/Span";
import { useSearchParams } from "react-router";
import Pagination from "@components/interfaces/Pagination";
import { Badge, Table, Tooltip, IconButton } from "@radix-ui/themes";
import ItemsNotFound from "@components/others/ItemsNotFound";
import { getStatusColor } from "@utils/colors/getStatusColor";

function OrdersList() {
  const { data, setIsViewModalOpen } = useContext(UserStates);
  const [pageParam, setPageParam] = useSearchParams({ page: "1" });

  const handleViewDetails = (data: any) => {
    setIsViewModalOpen({ isOpen: true, data: data });
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
      {data.orders.length > 0 && (
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
                {data.orders?.map((order) => (
                  <Table.Row align="center">
                    <Table.Cell>
                      <Span>{order.srNo}</Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span>{order.distributorName}</Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span>
                        <Badge color={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span>{order.orderDate}</Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span className="font-semibold">{order.items}</Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span className="font-semibold">
                        {order.totalAmount}.00 ₹
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
