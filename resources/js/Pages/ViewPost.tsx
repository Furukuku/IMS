import { formatDate } from "@/helpers/date";
import { PageProps, Post } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { IoMdArrowBack } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { FaFileDownload } from "react-icons/fa";
import Comments from "@/Components/Comments";
import { useState } from "react";
import ConfirmationModal from "@/Components/ConfirmationModal";
import HomeLayout from "@/Layouts/HomeLayout";


const ViewPost = ({ post }: { post: Post }) => {
  const [showPostOptions, setShowOptions] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const { user } = usePage<PageProps>().props.auth;
  const handleDowloadClick = (filename: string): void => {
    window.location.href = route('file.download', { filename: filename });
  };

  const handleDeletePostClick = (): void => {
    setShowOptions(false);
    setShowDeleteModal(true);
  };
  
  return (
    <HomeLayout>
      <main className="flex flex-col lg:flex-row py-5 px-2 sm:px-10">
        <div className="pe-10 hidden lg:inline-block">
          <Link
            href={route('dashboard')}
            className=""
          >
            <IoMdArrowBack  className="text-2xl cursor-pointer" />
          </Link>
        </div>
        <div className="bg-white border rounded shadow p-5 sm:p-10 flex-1 divide-y-[40px] divide-transparent">
          <section className="flex justify-between">
            <div>
              <p className="text-3xl font-semibold mb-1">{post.title}</p>
              <p className="text-sm text-zinc-700">{formatDate(post.created_at)}</p>
            </div>
            {user.id === post.user_id && (
              <div className="relative">
                <button 
                  className="text-xl z-0"
                  onClick={() => setShowOptions(true)}
                >
                  <SlOptionsVertical />
                </button>
                {showPostOptions && (
                  <>
                    <ul className="absolute right-2 top-3 bg-white shadow-sm border rounded text-sm divide-y-4 divide-transparent py-1 z-40">
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
                      className="fixed bg-zinc-950 bg-opacity-5 inset-0 z-30" 
                      onClick={() => setShowOptions(false)}
                    />
                  </>
                )}
                {showDeleteModal && (
                  <ConfirmationModal 
                    header={`Delete "${post.title}" Post?`}
                    message="Are you sure you want to delete this post? This will permanently delete the post!"
                    btnText="Delete"
                    id={post.id}
                    setShowModal={setShowDeleteModal}
                    routeName="post.destroy"
                    method="delete"
                  />
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
                  href={route('file.show', { filename: file.unique_name })}
                  target="_blank"
                  className="bg-zinc-100 border rounded-md shadow-sm p-2 w-20 truncate grow text-sm hover:underline hover:bg-zinc-200"
                >
                  {file.orig_name}
                </a>
                <button
                  className="bg-zinc-100 border px-2.5 rounded-md shadow-sm hover:bg-zinc-200"
                  onClick={() => handleDowloadClick(file.unique_name)}
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
    </HomeLayout>
  );
};

export default ViewPost;
