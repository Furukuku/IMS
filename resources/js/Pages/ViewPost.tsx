import { formatDate } from "@/helpers/date";
import Home from "@/Layouts/Home";
import { PageProps, Post } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { IoMdArrowBack } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { FaFileDownload } from "react-icons/fa";
import Comments from "@/Components/Comments";
import { useState } from "react";


const ViewPost = ({ post }: { post: Post }) => {
  const [showPostOptions, setShowOptions] = useState<boolean>(false);
  const { user } = usePage<PageProps>().props.auth;
  const handleDowloadClick = (filename: string): void => {
    window.location.href = route('file.download', { filename: filename });
  };

  const handleDeletePostClick = (): void => {
    console.log('delete');
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
            {user.id === post.user_id && (
              <div className="relative">
                <button 
                  className="text-xl"
                  onClick={() => setShowOptions(true)}
                >
                  <SlOptionsVertical />
                </button>
                {showPostOptions && (
                  <>
                    <ul className="absolute right-2 top-3 bg-white shadow-sm border rounded text-sm divide-y-4 divide-transparent py-1 z-20">
                      <li>
                        <Link 
                          href={route('post.edit', { id: post.id })}
                          method="get"
                          className="w-full text-start px-3 hover:bg-zinc-200"
                          as="button"
                          type="button"
                        >
                          Edit
                        </Link>
                      </li>
                      <li>
                        <button 
                          className="w-full text-start px-3 hover:bg-zinc-200"
                          onClick={handleDeletePostClick}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                    <div 
                      className="fixed bg-zinc-950 bg-opacity-5 inset-0 z-10" 
                      onClick={() => setShowOptions(false)}
                    />
                  </>
                )}
              </div>
            )}
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
                  href={route('file.show', { filename: file.path.slice(6) })}
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
