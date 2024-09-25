import { autoFormatDateV2, formatDate } from "@/helpers/date";
import { Post } from "@/types";
import { Link } from "@inertiajs/react";


const Posts = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      {posts.map(post => (
        <Link
          key={post.id}
          href={route('post.view', { id: post.id })}
        >
          <article 
            className="border px-5 py-4 rounded-md shadow mb-5 w-full"
          >
            <div className="flex">
              <p className="text-lg font-semibold grow w-20 truncate">{post.id} {post.title}</p>
            </div>
            <p className="text-xs truncate">{autoFormatDateV2(post.created_at)}</p>
          </article>
        </Link>
      ))}
    </>
  );
};

export default Posts;
