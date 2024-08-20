import { formatDate } from "@/helpers/date";

interface ReplyData {
  username: string;
  content: string;
  createdAt: Date;
}

const Reply = ({ username, content, createdAt }: ReplyData) => {
  return (
    <li className="ps-5">
      <section className="flex items-center gap-2 mb-1">
        <img 
          src="https://placehold.co/50" 
          alt="profile picture" 
          className="rounded-full size-5"
        />
        <p className="text-sm font-semibold">
          {username} 
          <span className="text-xs text-zinc-700 italic font-normal ps-2">{formatDate(createdAt)}</span>
        </p>
      </section>
      <section className="px-6">
        <p className="text-sm text-zinc-800 mb-2">{content}</p>
      </section>
    </li>
  );
};

export default Reply;
