import { Link, usePage } from "@inertiajs/react";
import { NavItems } from "@/Interfaces/NavBar";

const NavItem = ({ label, link, components, icon }: NavItems) => {
  const { component } = usePage();
  
  return (
    <li>
      <Link 
        href={link}
        className={`flex items-center gap-2 text-zinc-200 p-3 rounded-md hover:bg-white hover:bg-opacity-20 ${components.includes(component) && 'bg-white bg-opacity-25'}`}
      >
        {icon}
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
