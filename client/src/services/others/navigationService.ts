import { type NavigateFunction } from "react-router";

let navigateFn: NavigateFunction;

export const setNavigate = (nav: NavigateFunction) => {
  navigateFn = nav;
};

export const navigateTo = (link: string) => {
  if (navigateFn) {
    navigateFn(link);
  } else {
    console.warn("Navigate function not set yet!");
  }
};
