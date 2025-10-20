import { type RouteObject } from "react-router";

import UserManagementLayout from "@pages/admin/user-management/layout";
import BookManagementLayout from "@pages/admin/book-management/layout";
import OrderManagementLayout from "@pages/proprietor/order-management/layout";
import api from "@servicesOther/axios.api";

const ProprietorRoutes = (): RouteObject[] => {
  // const { getCourses, getEnrolledCourses, getCourseById } = useCourseApi();
  // const { getQuizzes, quizAttempt, getQuizResult, getAttemptQuizzes } =
  //   useQuizApi();
  // const { getNotifications } = useNotificationApi();
  // const { getOverviewData, getAchievements } = useOverviewApi();

  return [
    {
      path: "",
      element: <>pending</>,
      
    },
    {
      path: "orders-management",
      element: <OrderManagementLayout/>,
      // loader: getCourses,
    },
    {
      path: "team-progress",
      element: <></>,
      // loader: getCourses,
    },
    {
      path: "books-stock",
      element: <></>,
      // loader: getCourses,
    },
    {
      path: "notifications",
      element: "notifications",
      // loader: getNotifications,
    },
  ];
};

export default ProprietorRoutes;
