import { ReactNode, Dispatch, SetStateAction } from "react";

export interface NavItems {
  label: string;
  link: string;
  components: string[];
  icon: ReactNode;
}

export interface NavBarProps {
  navBar: boolean;
  setNavBar: Dispatch<SetStateAction<boolean>>;
}