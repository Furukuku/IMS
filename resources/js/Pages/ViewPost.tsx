import { formatDate } from "@/helpers/date";
import Home from "@/Layouts/Home";
import { Post } from "@/types";
import { Link } from "@inertiajs/react";
import { IoMdArrowBack } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { FaFileDownload } from "react-icons/fa";
import Comments from "@/Components/Comments";


const ViewPost = ({ post }: { post: Post }) => {
  const handleDowloadClick = (filename: string): void => {
    window.location.href = route('download-file', { filename: filename });
  };
  
  return (
    <Home>
      <main className="flex py-5 px-14 lg:px-10">
        <Link
          href={route('dashboard')}
          className="pe-10"
        >
          <IoMdArrowBack  className="text-2xl cursor-pointer" />
        </Link>
        <div className="bg-white border shadow p-10 flex-1 divide-y-[40px] divide-transparent">
          <section className="flex justify-between">
            <div>
              <p className="text-3xl font-semibold mb-1">{post.title}</p>
              <p className="text-sm text-zinc-700">{formatDate(post.created_at)}</p>
            </div>
            <button className="text-xl">
              <SlOptionsVertical />
            </button>
          </section>
          <section>
            <p className="leading-tight text-zinc-700">{post.description}</p>
          </section>
          <ul className="divide-y-8 divide-transparent">
            {post.files.map(file => (
              <li 
                key={file.id}
                className="flex gap-2"
              >
                <a 
                  href={route('show-file', { filename: file.path.slice(6) })}
                  target="_blank"
                  className="bg-zinc-100 border rounded-md shadow-sm inline-block p-2 text-sm hover:underline hover:bg-zinc-200"
                >
                  {file.path.slice(6)}
                </a>
                <button
                  className="bg-zinc-100 border px-2.5 rounded-md shadow-sm hover:bg-zinc-200"
                  onClick={() => handleDowloadClick(file.path.slice(6))}
                >
                  <FaFileDownload />
                </button>
              </li>
            ))}
          </ul>
          <Comments 
            postId={post.id} 
            comments={post.comments}
            commentCount={post.comments_count}
          />
        </div>
      </main>
    </Home>
  );
};

export default ViewPost;
