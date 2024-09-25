import Conversations from "@/Components/Conversations";
import HomeLayout from "./HomeLayout";
import { ReactNode, useEffect, useState } from "react";
import { Conversation, User } from "@/types";
import ConversationSearch from "@/Components/ConversationSearch";
import { Link } from "@inertiajs/react";

const MessagesLayout = ({ 
  conversations, 
  conversation, 
  client,
  children 
}: { 
  conversations: Conversation[]; 
  conversation?: Conversation; 
  client?: User;
  children?: ReactNode 
}) => {
  const [searchedUsers, setSearchUsers] = useState<User[] | null>(null);

  return (
    <HomeLayout>
      <main className="flex h-[calc(100dvh-49.6px)]">
        <nav className={`${conversation || client ? 'hidden sm:flex sm:flex-col sm:items-center' : 'flex flex-col items-center'} border h-full bg-white py-7 px-5 w-full sm:w-72`}>
          <ConversationSearch 
            setSearchUsers={setSearchUsers}
          />
          {searchedUsers ? (
            <ul className="w-full divide-y-4 divide-transparent overflow-y-auto">
                {searchedUsers.map(searchedUser => (
                  <li key={searchedUser.id}>
                    <Link 
                      href={route('conversation.new-message', { user_id: searchedUser.id })}
                      as="button"
                      className={`w-full flex gap-3 items-center py-2 px-4 rounded-lg hover:bg-zinc-200`}
                    >
                      <img 
                        src="https://placehold.co/50X50" 
                        alt="profile picture" 
                        className="size-7 rounded-full"
                      />
                      <div className="flex-1 grid divide-y-2 divide-transparent">
                        <p className="text-start text-sm font-semibold truncate">{searchedUser.first_name} {searchedUser.last_name}</p>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          ) : (
            <Conversations 
              conversations={conversations}
              activeConvo={conversation}
            />
          )}
        </nav>
        {children}
      </main>
    </HomeLayout>
  );
};

export default MessagesLayout;
