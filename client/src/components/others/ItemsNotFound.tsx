import { Button } from "@radix-ui/themes";
import {
  BiBookOpen,
  BiCalendar,
  BiSearch,
  BiSolidSchool,
  BiTrophy,
} from "react-icons/bi";
import { IoHelpCircleSharp } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";
import { Link } from "react-router";

interface ItemsNotFoundProps {
  title?: string;
  type?:
    | "course"
    | "quiz"
    | "user"
    | "event"
    | "notification"
    | "general"
    | "student"
    | "course-admin"
    | "quiz-admin"
    | "schools"
    | "participants";
  className?: string;
  buttonLink?: string;
  buttonText?: string;
}

export default function ItemsNotFound({
  title = "Not Found",
  type = "general",
  className = "",
  buttonLink,
  buttonText,
}: ItemsNotFoundProps) {
  const getContextualElements = () => {
    switch (type) {
      case "course":
        return {
          icon: BiBookOpen,
          primaryColor: "#06b6d4", // crimson-500
          title: title || "Course Not Found",
        };
      case "course-admin":
        return {
          icon: BiBookOpen,
          primaryColor: "#06b6d4", // crimson-500
          title: title || "Course Not Found",
        };
      case "quiz":
        return {
          icon: BiTrophy,
          primaryColor: "#f59e0b", // amber-500
          title: title || "Quiz Not Found",
        };
      case "schools":
        return {
          icon: BiSolidSchool,
          primaryColor: "#f59e0b", // violet-500
          title: title || "School Not Found",
        };
      case "quiz-admin":
        return {
          icon: BiTrophy,
          primaryColor: "#f59e0b", // amber-500
          title: title || "Quiz Not Found",
        };
      case "student":
        return {
          icon: PiStudentBold,
          primaryColor: "#8b5cf6", // violet-500
          title: title || "student Not Found",
        };
      case "participants":
        return {
          icon: PiStudentBold,
          primaryColor: "#8b5cf6", // violet-500
          title: title || "Participants Not Found",
        };
      case "event":
        return {
          icon: BiCalendar,
          primaryColor: "#10b981", // emerald-500
          title: title || "Event Not Found",
        };
      case "notification":
        return {
          icon: IoHelpCircleSharp,
          primaryColor: "#ef4444", // red-500
          title: title || "Notification Not Found",
        };
      default:
        return {
          icon: BiSearch,
          primaryColor: "#06b6d4", // crimson-500
          title: title || "Not Found",
        };
    }
  };

  const {
    icon: ContextIcon,
    primaryColor,
    title: contextTitle,
  } = getContextualElements();

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-3 sm:space-y-6 ${className}`}
    >
      <ContextIcon size={30} color={primaryColor} />
      <div className="text-center space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-white">
          {contextTitle}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
          {type === "course" &&
            "The courses you're looking for doesn't exist or has been private."}
          {type === "course-admin" &&
            "The courses not found or you need to create one."}
          {type === "quiz" &&
            "This quizzes is not available or may have been deleted or private."}
          {type === "student" &&
            "The Students not found or you need to create one."}
          {type === "event" &&
            "This event doesn't exist or has been cancelled."}
          {type === "notification" &&
            "No notifications match your search criteria."}
          {type === "quiz-admin" &&
            "The quizzes not found or you need to create one."}
          {type === "general" &&
            "The page or content you're looking for doesn't exist."}
          {type === "schools" &&
            "The schools not found or you need to create one."}
          {type === "participants" &&
            "The participants not found or didn't attend."}
        </p>
        {buttonLink && (
          <Link to={buttonLink}>
            <Button size={"3"} variant="soft" radius="medium">
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
