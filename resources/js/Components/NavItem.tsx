import { Link, usePage } from "@inertiajs/react";
import { NavItems } from "@/Interfaces/NavBar";

const NavItem = ({ label, link, icon }: NavItems) => {
  const { url } = usePage();

  return (
    <li>
      <Link 
        href={link}
        className={`flex items-center gap-2 text-zinc-200 p-3 rounded-md ${url === link ? 'bg-white bg-opacity-25' : ''}`}
      >
        {icon}
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
