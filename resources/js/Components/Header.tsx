import { NavBarProps } from "@/Interfaces/NavBar";
import { IoMenu } from "react-icons/io5";

const Header = ({ navBar, setNavBar }: NavBarProps) => {
  const handleNavBarOpen = (): void => {
    setNavBar(true);
  };

  return (
    <header className="flex lg:justify-end justify-between items-center px-5 py-3 border shadow sticky top-0 bg-white">
      <IoMenu 
        className="text-2xl block lg:hidden"
        onClick={handleNavBarOpen} 
      />
      <div className="flex justify-end">
        <img 
          src="https://placehold.co/400" 
          alt="profile picture"
          className="size-6 rounded-full mx-2" 
        />
        <button
          className="text-sm"
        >
          John Doe
        </button>
      </div>
    </header>
  )
}

export default Header
