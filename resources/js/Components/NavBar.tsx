import { AiFillMessage } from "react-icons/ai";
import { MdManageAccounts, MdSpaceDashboard } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { IoIosClose } from "react-icons/io";
import { NavItems } from "@/Interfaces/NavBar";
import NavItem from "./NavItem";
import { NavBarProps } from "@/Interfaces/NavBar";

const NavBar = ({ navBar, setNavBar }: NavBarProps) => {
  const navItems: NavItems[] = [
    {
      label: 'Dashboard',
      links: [
        '/', 
        '/add-post'
      ],
      icon: <MdSpaceDashboard />
    },
    {
      label: 'Students',
      links: ['/students'],
      icon: <PiStudentFill />
    },
    {
      label: 'Messages',
      links: ['/messages'],
      icon: <AiFillMessage />
    },
    {
      label: 'Account',
      links: ['/account'],
      icon: <MdManageAccounts />
    },
  ];

  const handleNavBarClose = (): void => {
    setNavBar(false);
  };

  return (
    <nav className={`bg-zinc-950 w-60 py-10 px-5 fixed inset-y-0 z-10 lg:left-0 ${navBar ? 'left-0' : '-left-60'} transition-all duration-300 ease-in-out`}>
      <IoIosClose 
        className="text-white text-3xl absolute right-2 top-2 block lg:hidden cursor-pointer" 
        onClick={handleNavBarClose}
      />
      <img 
        src="https://placehold.co/400" 
        alt="profile picture"
        className="w-20 mx-auto mb-10" 
      />
      <ul>
        {navItems.map(navItem => (
          <NavItem 
            key={navItem.label}
            label={navItem.label}
            links={navItem.links}
            icon={navItem.icon}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
