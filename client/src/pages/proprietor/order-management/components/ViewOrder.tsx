import { useContext } from "react";
import { UserStates } from "../context";
import { MdClose } from "react-icons/md";
import type { TOrder } from "@types_/user";
import { toast } from "@functions/toast/toast";
import Span from "@components/interfaces/Span";
import Modal from "@components/interfaces/Modal";
import { data, useRevalidator } from "react-router";
import useStudentApi from "@hooks/api/admin/useStudent.api";
import { Button, ScrollArea, Table } from "@radix-ui/themes";

function ViewOrder() {
  const { isViewModalOpen, setIsViewModalOpen } = useContext(UserStates);
  const { createStudent, loading, updateStudent } = useStudentApi();
  const { revalidate } = useRevalidator();
  const isEdit = isViewModalOpen.data.srNo;

  const submitFrom = async (params: any) => {
    const apiCall = isEdit ? updateStudent : createStudent;

    toast.processing(apiCall(params), {
      loadingText: "Adding User..",
      successText: () => {
        revalidate();
        setIsViewModalOpen({ isOpen: false, data: {} as TOrder });
        return "user added successfully";
      },
      errorText: (response) => response.data.error,
    });
  };

  const optionsStatus = [
    { label: "Pending", value: "pending" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
  ];

  console.log(isViewModalOpen);

  return (
    <Modal open={true} className="!max-w-[55pc]" size="1">
      <ScrollArea type="hover" scrollbars="vertical">
        <div className="space-y-3 sm:space-y-6 p-2 sm:p-5">
          <div className="mb-4 sm:mb-6 flex justify-between">
            <div>
              <h3 className="font-semibold tracking-tight text-xl">
                Order Details
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Order from tejas wagh Distributor •{" "}
                {new Date(isViewModalOpen.data.createdAt).toDateString()}
              </p>
            </div>
            <MdClose
              onClick={() =>
                setIsViewModalOpen({ isOpen: false, data: {} as TOrder })
              }
              className="cursor-pointer"
              size={20}
            />
          </div>
          <div className="gap-2">
            <div className="">
              <div className="space-y-4 text-nowrap overflow-x-auto">
                <Table.Root
                  variant="surface"
                  className="dark:!bg-gray-800 !bg-white !border-[1px] border-gray-200 dark:!border-gray-700"
                >
                  <Table.Header>
                    <Table.Row>
                      {[
                        "Book Name",
                        "Base Price",
                        "MRP",
                        "Quantity",
                        "Category",
                        "Total",
                      ].map((head) => (
                        <Table.ColumnHeaderCell key={head}>
                          {head}
                        </Table.ColumnHeaderCell>
                      ))}
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {isViewModalOpen.data.items.map((book: any) => (
                      <Table.Row align="center">
                        <Table.Cell>
                          <Span>{book.name}</Span>
                        </Table.Cell>
                        <Table.Cell>
                          <Span className="font-semibold"></Span>
                        </Table.Cell>
                        <Table.Cell>
                          <Span className="font-semibold">
                            {book.unitPrice}.00 ₹
                          </Span>
                        </Table.Cell>
                        <Table.Cell>
                          <Span>{book.qty}</Span>
                        </Table.Cell>
                        <Table.Cell>
                          <Span>{book.category}</Span>
                        </Table.Cell>
                        <Table.Cell>
                          <Span>{book.totalPrice}.00 ₹</Span>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </div>
              <div className="bg-gray-800 p-4 mt-6 rounded-lg border-[1px] border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>
                      Subtotal ({isViewModalOpen.data.totalQuantity} items):
                    </span>
                    <span>₹{isViewModalOpen.data.totalPrice}</span>
                  </div>
                  <div className="shrink-0 bg-border h-[1px] w-full" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span>₹{isViewModalOpen.data.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={() =>
                setIsViewModalOpen({
                  isOpen: false,
                  data: {} as TOrder,
                })
              }
              variant="soft"
              size="3"
              radius="medium"
              color="gray"
              disabled={loading}
            >
              Close
            </Button>
          </div>
        </div>
      </ScrollArea>
    </Modal>
  );
}

export default ViewOrder;
