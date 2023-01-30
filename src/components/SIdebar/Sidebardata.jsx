import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
export const AdminbarData = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Upcoming Records",
    path: "/adupcoming",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Inprogress Records",
    path: "/addelivery",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Completed Records",
    path: "/adcompleted",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
];

export const SellerData = [
  {
    title: "Home",
    path: "/admin",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Upcoming Records",
    path: "/upcoming",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Inprogress Records",
    path: "/delivery",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Completed Records",
    path: "/completed",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
];
