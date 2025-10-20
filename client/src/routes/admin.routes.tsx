import { type RouteObject } from "react-router";

import UserManagementLayout from "@pages/admin/user-management/layout";
import BookManagementLayout from "@pages/admin/book-management/layout";
import OrderManagementLayout from "@pages/admin/order-management/layout";
import LocationManagementLayout from "@pages/admin/locations-management/layout";

const AdminRoutes = (): RouteObject[] => {
  // const { getCourses, getEnrolledCourses, getCourseById } = useCourseApi();
  // const { getQuizzes, quizAttempt, getQuizResult, getAttemptQuizzes } =
  //   useQuizApi();
  // const { getNotifications } = useNotificationApi();
  // const { getOverviewData, getAchievements } = useOverviewApi();

  return [
    {
      index: true,
      element: <UserManagementLayout />,
      // loader: getEnrolledCourses,
    },
    {
      path: "books",
      element: <BookManagementLayout />,
      // loader: getCourseById,
    },
    {
      path: "orders",
      element: <OrderManagementLayout />,
      // loader: getCourses,
    },
    {
      path: "locations",
      element: <LocationManagementLayout />,
      // loader: getAttemptQuizzes,
    },
    {
      path: "notifications",
      element: "notifications",
      // loader: getNotifications,
    },
  ];
};

export default AdminRoutes;
