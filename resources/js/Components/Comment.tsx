import { FaReply } from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";
import Replies from "./Replies";
import { useState } from "react";
import { formatDate } from "@/helpers/date";

interface CommentData {
  username: string;
  content: string;
  replyCount: number;
  createdAt: Date;
}

const Comment = ({ username, content, replyCount, createdAt }: CommentData) => {
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);

  return (
    <li>
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
        {showReplyForm && (
          <form className="flex flex-col gap-1 items-end">
            <textarea 
              className="text-sm p-1.5 resize-none rounded w-full h-20"
            />
            <div className="flex gap-3">
              <button 
                className="underline text-sm"
                type="button"
                onClick={() => setShowReplyForm(false)}
              >
                Cancel
              </button>
              <button className="underline text-sm">Reply</button>
            </div>
          </form>
          )} 
          <div className="flex gap-3">
            {!showReplyForm && (
              <button
                className="flex items-center gap-1 font-medium text-sm underline"
                onClick={() => setShowReplyForm(true)}
              >
                <FaReply />
                Reply
              </button>
            )}
            {replyCount > 0 && (
              <button
                className="flex items-center gap-1 font-medium text-sm underline"
                onClick={() => setShowReplies(!showReplies)}
              >
                <LiaCommentSolid />
                Replies &#40;{replyCount}&#41;
              </button>
            )}
          </div>
        {showReplies && <Replies />}
      </section>
    </li>
  );
};

export default Comment;
