import { IoMdEye } from "react-icons/io";
import { UserStates } from "../context";
import type { TStudentData } from "./type";
import { useContext, useEffect, useState } from "react";
import Span from "@components/interfaces/Span";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router";
import Pagination from "@components/interfaces/Pagination";
import { Avatar, Badge, Table, Tooltip, IconButton } from "@radix-ui/themes";
import ItemsNotFound from "@components/others/ItemsNotFound";
import { getGenderColor } from "@utils/colors/getGenderColor";
import { FiDelete } from "react-icons/fi";
import { getRolesColor } from "@utils/colors/getRolesColor";
import api from "@servicesOther/axios.api";
import type { TUser } from "@types_/user";

function UsersList() {
  const navigate = useNavigate();
  const { setIsAddModalOpen } = useContext(UserStates);
  const [pageParam, setPageParam] = useSearchParams({ page: "1" });

  const [data, setData] = useState<TUser[]>([]);

  useEffect(() => {
    api.get("/admin/getUsers").then((res) => {
      setData(res.data);
    });
  }, []);

  const handleOpenEdit = (data: TStudentData) => {
    // setIsAddModalOpen({ isOpen: true, editData: data });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col space-y-1.5 pt-6">
          <h3 className="text-xl sm:text-2xl font-semibold leading-none tracking-tight">
            Users
          </h3>
          <p className="text-sm text-muted-foreground">
            {/* Showing {data.users?.length} of {data.totalUser} students */}
          </p>
        </div>
        {/* <Pagination
          length={data.totalUser}
          setPage={setPageParam}
          page={pageParam}
        /> */}
      </div>
      {data?.length > 0 && (
        <div className="pt-6">
          <div className="space-y-4 text-nowrap overflow-x-auto">
            <Table.Root
              variant="surface"
              className="dark:!bg-gray-800 !bg-white !border-[1px] border-gray-200 dark:!border-gray-700"
            >
              <Table.Header>
                <Table.Row>
                  {[
                    "Name",
                    "email",
                    "Password",
                    "Role",
                    "Location",
                    "Gender",
                    "Assigned Proprietor",
                    "Actions",
                  ].map((head) => (
                    <Table.ColumnHeaderCell key={head}>
                      {head}
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data?.map((user) => (
                  <Table.Row align="center">
                    <Table.RowHeaderCell>
                      <Avatar
                        variant="soft"
                        size="3"
                        radius="full"
                        fallback={user.fullname.charAt(0).toUpperCase()}
                      />
                      <span className="ml-2">{user.fullname}</span>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Span>{user.email}</Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Span>{user.password}</Span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge size="2" color={getRolesColor(user.role)}>
                        {user.role}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>{user.location}</Table.Cell>
                    <Table.Cell>
                      <Badge size={"2"} color={getGenderColor(user.gender)}>
                        {user.gender}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Span>{user.assignedProprietor}</Span>
                    </Table.Cell>
                    <Table.Cell>
                      {/* <div className="flex gap-2">
                        <Tooltip content="Delete User">
                          <IconButton
                            radius="medium"
                            color="red"
                            variant="soft"
                            onClick={() => navigate(`/admin/user/${user}/view`)}
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
                      </div> */}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </div>
        </div>
      )}
      {/* {data.users.length === 0 && (
        <ItemsNotFound
          type="student"
          title="No students found"
          className="h-full"
        />
      )} */}
      <div className="h-7" />
    </div>
  );
}

export default UsersList;
