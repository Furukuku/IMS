import Headers from "@/Components/Header";
import { Link } from "@inertiajs/react";
import { MdSpaceDashboard, MdManageAccounts } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { PiStudentFill } from "react-icons/pi";

const Home = () => {
  return (
    <>
      <nav className="bg-zinc-950 w-60 py-10 px-5 fixed inset-y-0">
        <img 
          src="https://placehold.co/400" 
          alt="profile picture"
          className="w-20 mx-auto mb-10" 
        />
        <ul>
          <li>
            <Link 
              href="/"
              className="flex items-center gap-2 text-white p-3 rounded-md bg-white bg-opacity-25"
            >
              <MdSpaceDashboard />
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              href="/"
              className="flex items-center gap-2 text-zinc-200  p-3 rounded-md"
            >
              <PiStudentFill />
              Students
            </Link>
          </li>
          <li>
            <Link 
              href="/"
              className="flex items-center gap-2 text-zinc-200  p-3 rounded-md"
            >
              <AiFillMessage />
              Messages
            </Link>
          </li>
          <li>
            <Link 
              href="/"
              className="flex items-center gap-2 text-zinc-200  p-3 rounded-md"
            >
              <MdManageAccounts />
              Account
            </Link>
          </li>
        </ul>
      </nav>
      <Headers />
    </>
  );
};

export default Home;
