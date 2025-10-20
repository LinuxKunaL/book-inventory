import { type RouteObject } from "react-router";

import OrderManagementLayout from "@pages/distributor/order-management/layout";
import BookManagementLayout from "@pages/distributor/book-management/layout";

const DistributorRoutes = (): RouteObject[] => {
  // const { getCourses, getEnrolledCourses, getCourseById } = useCourseApi();
  // const { getQuizzes, quizAttempt, getQuizResult, getAttemptQuizzes } =
  //   useQuizApi();
  // const { getNotifications } = useNotificationApi();
  // const { getOverviewData, getAchievements } = useOverviewApi();

  return [
    {
      path:"overview",
      element: <>pending</>
      // loader: getEnrolledCourses,
    },
    {
      path: "orders-request",
      element: <OrderManagementLayout />,
      // loader: getCourseById,
    },
    {
      path: "books",
      element: <BookManagementLayout />,
      // loader: getCourses,
    },
    
    {
      path: "notifications",
      element: "notifications",
      // loader: getNotifications,
    },
  ];
};

export default DistributorRoutes;
