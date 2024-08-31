import { FormEvent, useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Socket } from "socket.io-client";

interface MessageData {
  senderId: number;
  conversationId: number;
  content: string;
}

const SendMessageForm = ({ conversationId, socket, userId }: { conversationId: number; socket: Socket; userId: number }) => {
  const [messageData, setMessageData] = useState<MessageData>({
    senderId: userId,
    conversationId: conversationId,
    content: ''
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    setIsProcessing(true);
    e.preventDefault();
    socket.emit('sendMessage', messageData, () => {
      setMessageData({
        ...messageData,
        content: ''
      });
      setIsProcessing(false);
    });
  };

  return (
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
  );
};

export default SendMessageForm;
