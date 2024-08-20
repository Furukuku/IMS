import { Reply } from "@/types";
import ReplyComponent from "./Reply";


const Replies = ({ replies }: { replies: Reply[] }) => {
  return (
    <ul className="mt-4 divide-y-8 divide-transparent">
      {replies.map(reply => (
        <ReplyComponent 
          key={reply.id}
          username={`${reply.user.first_name} ${reply.user.last_name}`}
          content={reply.content}
          createdAt={reply.created_at}
        />
      ))}
    </ul>
  );
};

export default Replies;
