import Conversations from "@/Components/Conversations";
import HomeLayout from "./HomeLayout";
import { Link } from "@inertiajs/react";
import { IoIosSend, IoMdArrowBack } from "react-icons/io";
import { ReactNode, useState } from "react";
import { Conversation } from "@/types";


const MessagesLayout = ({ 
  conversations, 
  conversation, 
  children 
}: { 
  conversations: Conversation[]; 
  conversation?: Conversation; 
  children?: ReactNode 
}) => {
  const [isConvoActive, setIsConvoActive] = useState<boolean>(false); // sample
  const [sampleConvoTrigger, setSampleConvoTrigger] = useState(true); // sample
  // console.log(conversations);
  /*
    TODO: Make this responsive
  */
  return (
    <HomeLayout>
      <main className="flex h-[calc(100dvh-49.6px)]">
        <nav className="flex flex-col items-center border h-full bg-white py-7 px-5 w-full sm:w-72">
          <form className="mb-10 w-full px-4">
            <input
              type="text"
              className="text-sm px-2 py-2 w-full rounded border border-zinc-300"
              placeholder="Search..."
            />
          </form>
          <Conversations 
            conversations={conversations}
            conversation={conversation}
          />
        </nav>
        {sampleConvoTrigger && (
          <>
            {children}
          </>
        )}
      </main>
    </HomeLayout>
  );
};

export default MessagesLayout;
