import { NavBarProps } from "@/Interfaces/NavBar";
import { PageProps } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { MouseEvent, useState } from "react";
import { IoMenu } from "react-icons/io5";

const Header = ({ navBar, setNavBar }: NavBarProps) => {
  const { user } = usePage<PageProps>().props.auth;
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const handleNavBarOpen = (): void => {
    setNavBar(true);
  };
  const handleLogout = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    localStorage.removeItem('imsToken');
    router.post(route('logout'));
  };

  return (
    <>
      <header className="flex lg:justify-end justify-between items-center px-5 py-3 border shadow sticky top-0 bg-white z-10">
        <IoMenu 
          className="text-2xl block lg:hidden cursor-pointer"
          onClick={handleNavBarOpen} 
        />
        <div className="flex justify-end relative">
          <img 
            src="https://placehold.co/400" 
            alt="profile picture"
            className="size-6 rounded-full mx-2" 
          />
          <button
            className="text-sm"
            onClick={() => setLogoutModal(true)}
          >
            {user.first_name} {user.last_name}
          </button>
        </div>
      </header>
      {logoutModal && (
        <div 
          className="fixed inset-0 z-20"
          onClick={() => setLogoutModal(false)}
        >
            <button 
              className="absolute text-sm bg-white px-4 py-1.5 border rounded right-5 top-10 shadow hover:bg-zinc-100"
              onClick={handleLogout}
            >
              Logout
            </button>
        </div>
      )}
    </>
  )
}

export default Header;
