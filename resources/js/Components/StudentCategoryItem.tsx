import { Link } from "@inertiajs/react";

const StudentCategoryItem = ({ 
  name,
  url, 
  param, 
  status 
}: { 
  name: string; 
  url: string; 
  param: string; 
  status: string; 
}) => {

  return (
    <li>
      <Link 
        href={url}
        className={`${status === param ? 'bg-zinc-950 text-white hover:opacity-90' : 'bg-zinc-200 hover:bg-zinc-300' } text-sm px-4 py-1.5 rounded-md shadow shadow-zinc-300`}
        type="button"
        as="button"
      >
        {name}
      </Link>
    </li>
  );
};

export default StudentCategoryItem;
