import { PageProps, User } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import { FormEvent, useState } from "react";
import { IoIosSend, IoMdArrowBack } from "react-icons/io";
import { socket } from "@/socket";

const NewMessagePlacehold = ({ client }: { client: User }) => {
  const { user } = usePage<PageProps>().props.auth;
  const [messageData, setMessageData] = useState<{ userId: number; clientId: number; content: string }>({
    userId: user.id,
    clientId: client.id,
    content: ''
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (messageData.content.length > 0) {
      setIsProcessing(true);
      socket.emit('sendFirstMessage', messageData, (response: { ok: boolean; conversationId: number | null }) => {
        if (response.ok) {
          setMessageData({
            ...messageData,
            content: ''
          });

          router.get(route('conversation.view', { id: response.conversationId }))
        }

        setIsProcessing(false);
      });
    }
  };

  return (
    <div className={`${client ? 'flex-1' : 'hidden sm:block'}`}>
      <header className="flex gap-4 items-center border-b bg-white py-1.5 px-3">
        <Link 
          href={route('conversations')}
          className="text-xl block sm:hidden"
        >
          <IoMdArrowBack />
        </Link> 
        <img 
          src="https://placehold.co/200x200" 
          alt="profile picture" 
          className="size-8 rounded-full"
        />
        <p className="flex-1 w-20 grow font-semibold truncate">{client.first_name} {client.last_name}</p>
      </header>
      <div className="bg-white h-[calc(100dvh-(48.8px+49.6px))] relative">
        <main className="shadow-inner divide-y-[15px] divide-transparent h-[calc(100%-76.8px)] overflow-y-auto p-4">
          {/* {latestMessages.map(message => (
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
          ))} */}
        </main>
        <form 
          className="flex gap-3 items-center justify-end bg-white absolute inset-x-0 shadow bottom-0 border-t py-4 px-10"
          onSubmit={handleSubmit}
        >
          <textarea
            placeholder="Write something..."
            className="rounded-md resize-none h-11 px-2 py-1 text-sm border-zinc-300 transition-all w-96 focus:flex-1"
            value={messageData.content}
            onChange={e => setMessageData({
              ...messageData,
              content: e.target.value
            })}
            disabled={isProcessing}
          />
          <button 
            className="bg-zinc-950 text-white px-3 py-2.5 text-2xl rounded-md disabled:opacity-75"
            disabled={isProcessing}
            type="submit"
          >
            <IoIosSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewMessagePlacehold;
