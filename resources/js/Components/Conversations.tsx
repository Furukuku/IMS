import { Conversation, Message, PageProps } from "@/types";
import ConversationCard from "./ConversationCard";
import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

const Conversations = ({ conversations, activeConvo }: { conversations: Conversation[]; activeConvo?: Conversation }) => {
  const [newConversations, setNewConversations] = useState<Conversation[]>(conversations);
  const { user } = usePage<PageProps>().props.auth;

  useEffect(() => {
    const onReceivedMessage = (data: Message) => {
      setNewConversations(prevNewConversations => {
        const toUpdateConvoFromNewConvos = prevNewConversations.find(convo => convo.id == data.conversation_id);

        if (toUpdateConvoFromNewConvos) {
          const updatedNewConversations = prevNewConversations.filter(convo => convo.id != toUpdateConvoFromNewConvos.id);

          return [
            {
              ...toUpdateConvoFromNewConvos,
              latest_message: data
            },
            ...updatedNewConversations];
        }
        
        return prevNewConversations;
      });
    }

    const onNewConversation = (data: Conversation) => {
      if (data.pivot?.user_id == user.id) {
        setNewConversations([
          data,
          ...newConversations
        ]);
      }
    };
    
    socket.on('updateNewMessage', onReceivedMessage);
    socket.on('newConversation', onNewConversation);

    return () => {
      socket.off('updateNewMessage', onReceivedMessage);
      socket.on('newConversation', onNewConversation);
    };
  }, []);

  return (
    <ul className="w-full divide-y-4 divide-transparent overflow-y-auto">
      {/* <li>
        <Link 
          href=""
          className="flex gap-3 items-center py-2 px-4 rounded-lg hover:bg-zinc-50"
        >
          <img 
            src="https://placehold.co/50X50" 
            alt="profile picture" 
            className="size-7 rounded-full"
          />
          <div className="grid divide-y-2 divide-transparent">
            <section className="flex gap-4 justify-between items-center">
              <p className="text-sm font-semibold truncate">John Doe</p>
              <p className="text-[10px] font-semibold text-nowrap">12:44 PM</p>
            </section>
            <p className="w-full text-xs font-semibold truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum libero autem ipsa tenetur et earum quis fuga deleniti laboriosam? Eius explicabo ex, officiis, qui quo quisquam illo consectetur adipisci blanditiis harum tenetur ipsum a non distinctio nam corporis, reiciendis aliquam?</p>
          </div>
        </Link>
      </li>
      <li>
        <Link 
          href=""
          className="flex gap-3 items-center py-2 px-4 bg-zinc-100 rounded-lg hover:bg-zinc-50"
        >
          <img 
            src="https://placehold.co/50X50" 
            alt="profile picture" 
            className="size-7 rounded-full"
          />
          <div className="grid divide-y-2 divide-transparent">
            <section className="flex gap-4 justify-between items-center">
              <p className="text-sm font-medium w-10 grow truncate">John Doe</p>
              <p className="text-[10px] font-medium truncate">12:44 PM</p>
            </section>
            <p className="w-full text-xs truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum libero autem ipsa tenetur et earum quis fuga deleniti laboriosam? Eius explicabo ex, officiis, qui quo quisquam illo consectetur adipisci blanditiis harum tenetur ipsum a non distinctio nam corporis, reiciendis aliquam?</p>
          </div>
        </Link>
      </li> */}
      {newConversations.map(conversation => (
        <ConversationCard 
          key={conversation.id}
          conversationId={conversation.id}
          activeConversationId={activeConvo?.id}
          name={conversation.name || conversation.pivot?.client_name}
          latestMessage={conversation.latest_message}
        />
      ))}
    </ul>
  );
};

export default Conversations;
