import { FaReply } from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";
import Replies from "./Replies";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { formatDate } from "@/helpers/date";
import { useForm } from "@inertiajs/react";
import { Reply } from "@/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ShowMoreButton from "./ShowMoreButton";

interface CommentData {
  postId: number;
  commentId: number;
  username: string;
  content: string;
  replyCount: number;
  createdAt: Date;
}

interface ReplyFormData {
  post_id: number;
  comment_id: number;
  content: string;
}

const Comment = ({ postId, commentId, username, content, replyCount, createdAt }: CommentData) => {
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [isFetchingReplies, setIsFetchingReplies] = useState<boolean>(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyStateCount, setReplyStateCount] = useState<number>(replyCount);
  const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm<ReplyFormData>({
    post_id: postId,
    comment_id: commentId,
    content: ''
  });

  const handleReplyChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setData({
      ...data,
      content: e.target.value
    });
  };

  const handleReplySubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    post(route('replies.add'), { preserveScroll: true, preserveState: true, except: ['post'] });
  };

  const handleShowRepliesClick = async () => {
    try {
      if (!showReplies) {
        if (replies.length < 1) {
          const fetchedReplies = await getReplies(commentId, replies, setIsFetchingReplies);
          setReplies([
            ...replies,
            ...fetchedReplies
          ]);

          setIsFetchingReplies(false);
        }

        setShowReplies(true);
      } else {
        setShowReplies(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowMoreClick = async () => {
    try {
      const addedReplies = await getReplies(commentId, replies, setIsFetchingReplies);
      setReplies([
        ...replies,
        ...addedReplies
      ]);
      setIsFetchingReplies(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (wasSuccessful) {
      reset();

      setReplyStateCount(replyStateCount + 1);
    }
  }, [wasSuccessful]);

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
          <form 
            className="flex flex-col gap-1 items-end"
            onSubmit={handleReplySubmit}
          >
            <textarea 
              className="text-sm p-1.5 resize-none rounded w-full h-20"
              value={data.content}
              onChange={handleReplyChange}
              disabled={processing}
            />
            {errors.content && <p className="text-xs text-red-500 px-1 w-full">{errors.content}</p>}
            <div className="flex gap-3">
              <button 
                className="underline text-sm disabled:opacity-75"
                type="button"
                onClick={() => setShowReplyForm(false)}
                disabled={processing}
              >
                Cancel
              </button>
              <button 
                className="underline text-sm disabled:opacity-75"
                type="submit"
                disabled={processing}
              >
                Reply
              </button>
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
            {replyStateCount > 0 && (
              <button
                className="flex items-center gap-1 font-medium text-sm underline"
                onClick={handleShowRepliesClick}
              >
                <LiaCommentSolid />
                Replies &#40;{replyStateCount}&#41;
                {isFetchingReplies && <AiOutlineLoading3Quarters className="animate-spin" />}
              </button>
            )}
          </div>
        {showReplies && (
          <Replies replies={replies} />
        )}
        <ShowMoreButton 
          dataCount={replyStateCount}
          visibleData={replies}
          isProcessing={isFetchingReplies}
          handleShowMoreClick={handleShowMoreClick}
          showData={showReplies}
        />
      </section>
    </li>
  );
};

async function getReplies(
  commentId: number, 
  replies: Reply[], 
  setIsFetchingReplies: Dispatch<SetStateAction<boolean>>
) {
  try {
    setIsFetchingReplies(true);
    const response = await fetch(`/reply/show?comment_id=${commentId}&offset=${replies.length}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export default Comment;
