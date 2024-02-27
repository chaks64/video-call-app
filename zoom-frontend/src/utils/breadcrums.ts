import { NavigateFunction } from "react-router-dom";
import { BreadcrumsType } from "./Types";

export const getCreateMeetingBreadcrumbs = (
  navigate: NavigateFunction
): Array<BreadcrumsType> => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "Create Meeting",
  },
];

export const getOneOnOneMeetingBreadcrumbs = (
  navigate: NavigateFunction
): Array<BreadcrumsType> => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "Create Meeting",
    href: "#",
    onClick: () => {
      navigate("/create");
    },
  },
  {
    text: "Create One on One meeting",
  },
];
