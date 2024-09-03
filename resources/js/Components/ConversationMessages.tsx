import { Fragment } from "react/jsx-runtime";
import SendMessageForm from "./SendMessageForm";
import { autoFormatDateV2 } from "@/helpers/date";
import { Conversation, Message, PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { socket } from "@/socket";

const ConversationMessages = ({ 
  conversation, 
  newMessage,
  setNewMessage
}: { 
  conversation: Conversation; 
  newMessage: Message | null;
  setNewMessage: Dispatch<SetStateAction<Message | null>>;
}) => {
  const [latestMessages, setLatestMessages] = useState<Message[]>(conversation.messages || []);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const messagesContainer = useRef<HTMLElement | null>(null);
  const topElement = useRef<HTMLDivElement | null>(null);
  const { user } = usePage<PageProps>().props.auth;

  const messagesLength = useMemo(() => latestMessages.length, [latestMessages]);

  const getMoreMessages = async () => {
    try {
      const response: Response = await fetch(route('messages.show-more', { 
        conversation_id: conversation.id,
        limit: 10,
        skip: messagesLength
      }));
      const data = await response.json();

      if (data.length < 1) {
        setHasMore(false);
      } else {
        setLatestMessages(prev => [...data, ...prev]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      if (messagesContainer.current) {
          messagesContainer.current.scrollTop = messagesContainer.current.getBoundingClientRect().height / 2;
      }
    }
  };

  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      getMoreMessages();
    }
  };

  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
    }
    
    if (newMessage) {
      setLatestMessages(prev => [...prev, newMessage]);
      setNewMessage(null);
    }

  }, [newMessage]);

  useEffect(() => {
    const observer = new IntersectionObserver((onIntersection), { root: messagesContainer.current, rootMargin: '0px'});

    if (observer && topElement.current) {
      observer.observe(topElement.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [latestMessages]);

  return (
    <div className="bg-white h-[calc(100dvh-(48.8px+49.6px))] relative">
      <main 
        ref={messagesContainer}
        className="shadow-inner divide-y-[15px] divide-transparent h-[calc(100%-76.8px)] overflow-y-auto p-4"
      >
        {hasMore && <p ref={topElement} className="text-xs text-center" >Loading...</p>}
        {latestMessages.map(message => (
          <Fragment key={message.id}>
            {message.user_id == user.id ? (
              <article className="flex justify-end">
                <div className="max-w-[75%]">
                  <div className="divide-y-4 divide-transparent text-end">
                    <p className="inline-block bg-zinc-900 text-start text-white px-5 py-3 rounded-xl">{message.content}</p>
                    <p className="text-end text-xs font-medium text-zinc-600 px-2">{autoFormatDateV2(message.created_at)}</p>
                  </div>
                </div>
              </article>
            ) : (
              <article className="flex justify-start">
                <div className="flex gap-2 basis-9/12">
                  <img 
                    src="http://placehold.co/200x200" 
                    alt="profile picture" 
                    className="size-6 rounded-full"
                  />
                  <div className="divide-y-4 divide-transparent">
                    <p className="inline-block bg-zinc-200 px-5 py-3 rounded-xl">{message.content}</p>
                    <p className="text-xs font-medium text-zinc-600 px-2">{autoFormatDateV2(message.created_at)}</p>
                  </div>
                </div>
              </article>
            )}
          </Fragment>
        ))}
        {/* {newMessages.map(message => (
          <Fragment key={message.content}>
            {message.user_id == user.id ? (
              <article className="flex justify-end">
                <div className="max-w-[75%]">
                  <div className="divide-y-4 divide-transparent text-end">
                    <p className="inline-block bg-zinc-900 text-start text-white px-5 py-3 rounded-xl">{message.content}</p>
                    <p className="text-end text-xs font-medium text-zinc-600 px-2">{autoFormatDateV2(message.created_at)}</p>
                  </div>
                </div>
              </article>
            ) : (
              <article className="flex justify-start">
                <div className="flex gap-2 basis-9/12">
                  <img 
                    src="http://placehold.co/200x200" 
                    alt="profile picture" 
                    className="size-6 rounded-full"
                  />
                  <div className="divide-y-4 divide-transparent">
                    <p className="inline-block bg-zinc-200 px-5 py-3 rounded-xl">{message.content}</p>
                    <p className="text-xs font-medium text-zinc-600 px-2">{autoFormatDateV2(message.created_at)}</p>
                  </div>
                </div>
              </article>
            )}
          </Fragment>
        ))} */}
        {/* <article className="flex justify-end">
          <div className="flex gap-2 basis-9/12">
            <div className="divide-y-4 divide-transparent">
              <p className="bg-zinc-900 text-white px-5 py-3 rounded-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores maxime distinctio quia beatae perferendis doloribus laudantium ut unde. Asperiores accusamus esse quasi blanditiis praesentium necessitatibus ipsa neque, odit non consequuntur labore accusantium debitis aliquam a quibusdam facilis numquam repudiandae provident quidem. Velit a id veritatis consectetur quibusdam quas sunt autem veniam qui maiores, excepturi repellendus totam tempore molestiae facilis sit corporis rerum eius expedita dicta assumenda! Vel nam neque perspiciatis! Enim quasi tenetur possimus rem sint molestias eum dolores vitae at aliquid dicta neque distinctio, nostrum eligendi perspiciatis veniam cumque mollitia quaerat dolor animi, voluptates nam corrupti non. Porro, eos!</p>
              <p className="text-end text-xs font-medium text-zinc-600 px-2">3:49 PM</p>
            </div>
          </div>
        </article> */}
      </main>
      <SendMessageForm 
        conversationId={conversation.id} 
        socket={socket}
        userId={user.id}
      />
    </div>
  );
};

export default ConversationMessages;
