import { autoFormatDate } from "@/helpers/date";
import { Message, PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";

interface ConversationCardProps {
  conversationId: number;
  activeConversationId?: number;
  name?: string | null;
  latestMessage: Message | null;
}

const ConversationCard = ({ 
  conversationId, 
  activeConversationId, 
  name, 
  latestMessage
}: ConversationCardProps) => {
  const { user } = usePage<PageProps>().props.auth;

  return (
    <li>
      <Link 
        href={route('conversation.view', { conversation: conversationId })}
        className={`flex gap-3 items-center py-2 px-4 rounded-lg ${conversationId == activeConversationId && 'bg-zinc-100'} hover:bg-zinc-200`}
      >
        <img 
          src="https://placehold.co/50X50" 
          alt="profile picture" 
          className="size-7 rounded-full"
        />
        <div className="flex-1 grid divide-y-2 divide-transparent">
          <section className="flex gap-4 justify-between items-center">
            <p className="text-sm font-semibold w-10 grow truncate">{name || 'User'}</p>
            <p className="text-[10px] font-semibold truncate">{latestMessage ? autoFormatDate(latestMessage.created_at) : 'unknown'}</p>
          </section>
          <p className="text-xs font-semibold truncate">{user.id == latestMessage?.user_id  && 'You: '}{latestMessage?.content}</p>
        </div>
      </Link>
    </li>
  );
};

export default ConversationCard;
