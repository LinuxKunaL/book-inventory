import { MdCheck, MdLink, MdQuiz } from "react-icons/md";
import { BiMessageSquare } from "react-icons/bi";
import { FaBookOpen, FaVideo } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";

export const getIconColor = (type: string): any => {
  switch (type) {
    case "Announcement":
      return "blue";
    case "Message":
      return "green";
    case "Meeting Link":
      return "pink";
    case "Live Class":
      return "yellow";
    case "New Course":
      return "purple";
    case "New Quiz":
      return "red";
    default:
      return "gray";
  }
};

export const getIcon = (type: string): any => {
  switch (type) {
    case "Announcement":
      return <GrAnnounce className="size-5" />;
    case "Message":
      return <BiMessageSquare className="size-5" />;
    case "Meeting Link":
      return <MdLink className="size-5" />;
    case "Live Class":
      return <FaBookOpen className="size-5" />;
    case "New Course":
      return <FaVideo className="size-5" />;
    case "New Quiz":
      return <MdQuiz className="size-5" />;
    default:
      return <MdCheck className="size-5" />;
  }
};
