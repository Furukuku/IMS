import { Fragment } from "react/jsx-runtime";
import SendMessageForm from "./SendMessageForm";
import { autoFormatDateV2 } from "@/helpers/date";
import { Conversation, PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
// import { io } from "socket.io-client";

// export const socket = io("http://localhost:3000");

interface MessageProps {
  senderId: number;
  content: string;
  createdAt: Date;
}

const ConversationMessages = ({ conversation }: { conversation: Conversation }) => {
  // const socket = io("http://localhost:3000");
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [newMessages, setNewMessages] = useState<MessageProps[]>([]);
  const { user } = usePage<PageProps>().props.auth;

  useEffect(() => {

    const onConnect = () => {
      console.log(socket.id);
      console.log('hello');
      socket.emit('setRoom', { conversationId: conversation?.id });
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log('disconnected')
      setIsConnected(false);
    };

    const onReceivedMessage = (data: MessageProps) => {
      setNewMessages([
        ...newMessages,
        data
      ])
    };

    if (conversation) {
      socket.on('connect', onConnect);
    }

    socket.on('receivedMessage', onReceivedMessage);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('receivedMessage', onReceivedMessage);
      socket.off('disconnect', onDisconnect);
    }
  }, []);

  return (
    <div className="bg-white h-[calc(100dvh-(48.8px+49.6px))] relative">
      <main className="shadow-inner divide-y-[50px] divide-transparent h-[calc(100%-76.8px)] overflow-y-auto p-4">
        {conversation.messages?.map(message => (
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
        {newMessages.map(message => (
          <Fragment key={message.content}>
            {message.senderId == user.id ? (
              <article className="flex justify-end">
                <div className="max-w-[75%]">
                  <div className="divide-y-4 divide-transparent text-end">
                    <p className="inline-block bg-zinc-900 text-start text-white px-5 py-3 rounded-xl">{message.content}</p>
                    <p className="text-end text-xs font-medium text-zinc-600 px-2">{autoFormatDateV2(message.createdAt)}</p>
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
                    <p className="text-xs font-medium text-zinc-600 px-2">{autoFormatDateV2(message.createdAt)}</p>
                  </div>
                </div>
              </article>
            )}
          </Fragment>
        ))}
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