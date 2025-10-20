import { IoMdEye } from "react-icons/io";
import { UserStates } from "../context";
import { useContext } from "react";
import Span from "@components/interfaces/Span";
import { MdDelete, MdEdit, MdMap } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router";
import Pagination from "@components/interfaces/Pagination";
import { Avatar, Badge, Table, Tooltip, IconButton } from "@radix-ui/themes";
import ItemsNotFound from "@components/others/ItemsNotFound";
import { getGenderColor } from "@utils/colors/getGenderColor";
import { getRolesColor } from "@utils/colors/getRolesColor";

function LocationsList() {
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
            Locations
          </h3>
          <p className="text-sm text-muted-foreground">
            Showing {data.locations?.length} of {data.totalLocation} locations
          </p>
        </div>
        <Pagination
          length={data.totalLocation}
          setPage={setPageParam}
          page={pageParam}
        />
      </div>
      {data.locations.length > 0 && (
        <div className="pt-6">
          <div className="space-y-4 text-nowrap overflow-x-auto">
            <Table.Root
              variant="surface"
              className="dark:!bg-gray-800 !bg-white !border-[1px] border-gray-200 dark:!border-gray-700"
            >
              <Table.Header>
                <Table.Row>
                  {["Sr No", "Place Name", "Map Link", "Actions"].map(
                    (head) => (
                      <Table.ColumnHeaderCell key={head}>
                        {head}
                      </Table.ColumnHeaderCell>
                    )
                  )}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.locations?.map((location, index) => (
                  <Table.Row align="center">
                    <Table.Cell>
                      <Span>{index + 1}</Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span>{location.placeName}</Span>
                    </Table.Cell>
                    <Table.Cell>
                      <IconButton radius="medium" color="violet" variant="soft">
                        <MdMap size={16} />
                      </IconButton>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-2">
                        <Tooltip content="Delete User">
                          <IconButton
                            radius="medium"
                            color="red"
                            variant="soft"
                            onClick={() =>
                              navigate(`/admin/user/${location}/view`)
                            }
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
      {data.locations.length === 0 && (
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

export default LocationsList;
