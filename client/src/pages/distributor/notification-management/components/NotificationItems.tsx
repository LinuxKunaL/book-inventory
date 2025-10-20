import { IconButton, Table } from "@radix-ui/themes";
import { MdDelete } from "react-icons/md";
import { NotificationStates } from "../context";
import { useContext } from "react";

import { getIcon, getIconColor } from "@utils/colors/NotificationsIconColor";
import ItemsNotFound from "@components/others/ItemsNotFound";
import { deleteNotification } from "@servicesSocket/handler/admin.handler";
import { useRevalidator, useSearchParams } from "react-router";
import Pagination from "@components/interfaces/Pagination";
import Span from "@components/interfaces/Span";

function NotificationItems() {
  const { revalidate } = useRevalidator();
  const { data } = useContext(NotificationStates);
  const [pageParam, setPageParam] = useSearchParams({ page: "1" });

  if (!data.notifications) {
    return null;
  }
  const handleDelete = (id: string) => {
    deleteNotification(id);
    revalidate();
  };
  return (
    <div className="flex-1">
      <div className="flex items-baseline justify-between mb-4 mt-4">
        <h3 className="text-xl sm:text-2xl font-semibold leading-none tracking-tight">
          Previous Notifications
        </h3>
        <Pagination
          length={data.totalNotifications}
          setPage={setPageParam}
          page={pageParam}
        />
      </div>
      {data.notifications.length != 0 && (
        <Table.Root
          variant="surface"
          className="dark:!bg-gray-800 !bg-white !border-[1px] border-gray-200 dark:!border-gray-700 text-nowrap"
        >
          <Table.Header>
            <Table.Row>
              {[
                "Type",
                "Message",
                "Timestamp",
                "School",
                "Class Standard",
                "Section",
                "Actions",
              ].map((head) => (
                <Table.ColumnHeaderCell key={head}>
                  {head}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.notifications.map((notification) => {
              return (
                <Table.Row key={notification._id} align="center">
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <IconButton
                        color={getIconColor(notification.type)}
                        variant="solid"
                        radius="medium"
                        size="2"
                      >
                        {getIcon(notification.type)}
                      </IconButton>
                      <span>{notification.type}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{notification.message}</Table.Cell>
                  <Table.Cell>
                    {new Date(notification.createdAt).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Span>{notification.private?.school?.schoolName}</Span>
                  </Table.Cell>
                  <Table.Cell>
                    <Span>{notification.private?.classStandard}</Span>
                  </Table.Cell>
                  <Table.Cell>
                    <Span>{notification.private?.section}</Span>
                  </Table.Cell>
                  <Table.Cell>
                    <IconButton
                      onClick={() => handleDelete(notification._id)}
                      color="red"
                      variant="ghost"
                      size="3"
                    >
                      <MdDelete className="w-4 h-4" />
                    </IconButton>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      )}
      {data.notifications.length == 0 && (
        <ItemsNotFound
          type="notification"
          className="h-full"
          title="You have no notifications"
          buttonText="My Courses"
        />
      )}
    </div>
  );
}

export default NotificationItems;
