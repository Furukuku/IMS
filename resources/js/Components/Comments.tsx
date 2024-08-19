import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import CommentComponent from "./Comment";
import { IoIosSend } from "react-icons/io";
import { useForm } from "@inertiajs/react";
import { Comment } from "@/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface CommentFormData {
  post_id: number;
  content: string;
}

const Comments = ({ 
  postId, 
  comments, 
  commentCount 
}: { 
  postId: number; 
  comments: Comment[];
  commentCount: number;
}) => {
  const [visibleComments, setVisibleComments] = useState<Comment[]>(comments);
  const [isFetchingComments, setIsFetchingComments] = useState<boolean>(false);
  const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm<CommentFormData>({ 
    post_id: postId,
    content: ''
  });

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setData({ 
      ...data,
      content: e.target.value 
    });
  };

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (data.content.length > 0) {
      post(route('comments.add'), { preserveScroll: true });
    }
  };

  async function getMoreComments() {
    try {
      setIsFetchingComments(true);
      const response = await fetch(`/comments/show-more?post_id=${postId}&offset=${visibleComments.length}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  const handleShowMoreClick = async () => {
    const addedComments = await getMoreComments();
    setVisibleComments([
      ...visibleComments,
      ...addedComments
    ]);
    setIsFetchingComments(false);
  };

  useEffect(() => {
    if (wasSuccessful) {
      reset();
    }

    setVisibleComments(comments);
  }, [wasSuccessful, comments]);

  return (
    <section>
      <p className="text-xl font-semibold mb-3">Comments &#40;{commentCount}&#41;</p>
      <ul className="divide-y-[25px] divide-transparent ps-3 mb-5">
        {visibleComments.map(comment => (
          <CommentComponent 
            key={comment.id}
            username={`${comment.user.first_name} ${comment.user.last_name}`}
            content={comment.content}
            replyCount={comment.replies_count}
            createdAt={comment.created_at}
          />
        ))}
      </ul>
      <section className="flex flex-col items-center gap-1 mb-10">
        {commentCount != visibleComments.length && (
          <>
            <button 
              className="text-sm underline"
              onClick={handleShowMoreClick}
            >
              Show more
            </button>
            {isFetchingComments && <AiOutlineLoading3Quarters className="animate-spin" />}
          </>
        )}
      </section>
      <form 
        className="ps-3"
        onSubmit={handleCommentSubmit}
      >
        <textarea 
          className="w-full rounded px-2 py-1 text-sm h-20 placeholder:text-sm"
          placeholder="Write something..."
          value={data.content}
          onChange={handleCommentChange}
          disabled={processing}
        />
        {errors.content && <p className="text-xs text-red-500 px-1">{errors.content}</p>}
        <div className="flex justify-end">
          <button 
            className="bg-zinc-950 text-white text-2xl px-2 py-1 rounded-md disabled:opacity-75"
            type="submit"
            disabled={processing}
          >
            <IoIosSend />
          </button>
        </div>
      </form>
    </section>
  );
};

export default Comments;
