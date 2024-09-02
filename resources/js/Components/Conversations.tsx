import { Conversation, Message } from "@/types";
import { Link } from "@inertiajs/react";
import ConversationCard from "./ConversationCard";
import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { autoFormatDate } from "@/helpers/date";

interface NewConvoCardProp {
  name: string | null | undefined;
  conversationId: number;
  message: string;
  updatedAt: Date;
}

const Conversations = ({ conversations, activeConvo }: { conversations: Conversation[]; activeConvo?: Conversation }) => {
  const [newConversations, setNewConversations] = useState<Conversation[]>(conversations);
  const [updatedConvos, setUpdatedConvos] = useState<NewConvoCardProp[]>([]);

  useEffect(() => {
    const onReceivedMessage = (data: Message) => {
      setNewConversations(prevNewConversations => {
        const toUpdateConvoFromNewConvos = prevNewConversations.find(convo => convo.id == data.conversation_id);

        if (toUpdateConvoFromNewConvos) {
          const updatedNewConversations = prevNewConversations.filter(convo => convo.id != toUpdateConvoFromNewConvos.id);
          
          setUpdatedConvos(prevUpdatedConvos => {
            const newConvos = prevUpdatedConvos.filter(convo => convo.conversationId != toUpdateConvoFromNewConvos.id);
            newConvos.unshift({
              name: toUpdateConvoFromNewConvos.name || toUpdateConvoFromNewConvos.pivot?.name,
              conversationId: data.conversation_id,
              message: data.content,
              updatedAt: data.created_at
            });

            return [...newConvos];
          });

          
          return updatedNewConversations;
        }

        setUpdatedConvos(prevUpdatedConvos => {
          const toUpdateConvoFromUpdatedConvos = prevUpdatedConvos.find(convo => convo.conversationId == data.conversation_id);

          if (toUpdateConvoFromUpdatedConvos) {
            const newConvos = prevUpdatedConvos.filter(convo => convo.conversationId != toUpdateConvoFromUpdatedConvos.conversationId);
            newConvos.unshift({
              name: toUpdateConvoFromUpdatedConvos.name,
              conversationId: data.conversation_id,
              message: data.content,
              updatedAt: data.created_at
            });
  
            return [...newConvos];
          }

          return prevUpdatedConvos;
        });
        
        return prevNewConversations;
      });
    }

    socket.on('updateNewMessage', onReceivedMessage);

    return () => {
      socket.off('updateNewMessage', onReceivedMessage)
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
      {updatedConvos.map(convo => (
        <li key={convo.conversationId}>
          <Link 
            href={route('conversation.view', { id: convo.conversationId })}
            className={`flex gap-3 items-center py-2 px-4 rounded-lg ${convo.conversationId == activeConvo?.id && 'bg-zinc-100'} hover:bg-zinc-200`}
          >
            <img 
              src="https://placehold.co/50X50" 
              alt="profile picture" 
              className="size-7 rounded-full"
            />
            <div className="flex-1 grid divide-y-2 divide-transparent">
              <section className="flex gap-4 justify-between items-center">
                <p className="text-sm font-semibold w-10 grow truncate">{convo.name || 'User'}</p>
                <p className="text-[10px] font-semibold truncate">{autoFormatDate(convo.updatedAt)}</p>
              </section>
              <p className="text-xs font-semibold truncate">{convo.message}</p>
            </div>
          </Link>
        </li>
      ))}
      {newConversations.map(conversation => (
        <ConversationCard 
          key={conversation.id}
          conversationId={conversation.id}
          activeConversationId={activeConvo?.id}
          name={conversation.name || conversation.pivot?.name}
          latestMessage={conversation.latest_message}
        />
      ))}
    </ul>
  );
};

export default Conversations;
