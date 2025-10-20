import { useContext } from "react";
import { UserStates } from "../context";
import Span from "@components/interfaces/Span";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router";
import Pagination from "@components/interfaces/Pagination";
import { Table, Tooltip, IconButton } from "@radix-ui/themes";
import ItemsNotFound from "@components/others/ItemsNotFound";


function BooksList() {
  const navigate = useNavigate();
  const { data, setIsAddModalOpen } = useContext(UserStates);
  const [pageParam, setPageParam] = useSearchParams({ page: "1" });

  const handleOpenEdit = (data: any) => {
    // setIsAddModalOpen({ isOpen: true, editData: data });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col space-y-1.5 pt-6">
          <h3 className="text-xl sm:text-2xl font-semibold leading-none tracking-tight">
            Books
          </h3>
          <p className="text-sm text-muted-foreground">
            Showing {data.books?.length} of {data.totalBooks} books
          </p>
        </div>
        <Pagination
          length={data.totalBooks}
          setPage={setPageParam}
          page={pageParam}
        />
      </div>
      {data.books.length > 0 && (
        <div className="pt-6">
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
                    "Actions",
                  ].map((head) => (
                    <Table.ColumnHeaderCell key={head}>
                      {head}
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.books?.map((book) => (
                  <Table.Row align="center">
                    <Table.RowHeaderCell>
                      <div className="flex items-center gap-1">
                        <img
                          className="w-15 rounded-md"
                          src="https://cimg.acharyaprashant.org/images/img-4a99e7ac-31d1-43d8-8845-76a7f1c339c4/10/image.jpg"
                          alt={book.name}
                        />
                        <span className="ml-2">{book.name}</span>
                      </div>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Span className="font-semibold">
                        {book.basePrice}.00 ₹
                      </Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span className="font-semibold">{book.mrp}.00 ₹</Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span>{book.quantity}</Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span>{book.category}</Span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-2">
                        <Tooltip content="Delete User">
                          <IconButton
                            radius="medium"
                            color="red"
                            variant="soft"
                            onClick={() => navigate(`/admin/user/${book}/view`)}
                          >
                            <MdDelete size={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Edit User">
                          <IconButton
                            // onClick={() => handleOpenEdit(student)}
                            radius="medium"
                            color="sky"
                            variant="soft"
                          >
                            <MdEdit size={16} />
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
      {data.books.length === 0 && (
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

export default BooksList;
