import { ReactNode, Dispatch, SetStateAction } from "react";

export interface NavItems {
  label: string;
  links: string[];
  icon: ReactNode;
}

export interface NavBarProps {
  navBar: boolean;
  setNavBar: Dispatch<SetStateAction<boolean>>;
}