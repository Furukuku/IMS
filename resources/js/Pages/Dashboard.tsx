import { formatDate } from "@/helpers/date";
import HomeLayout from "@/Layouts/HomeLayout";
import { PageProps, Post } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";

const Dashboard = ({ posts }: { posts: Post[] }) => {
  const { flash, auth } = usePage<PageProps>().props;
  const postList = posts.map(post => (
    <Link
      key={post.id}
      href={route('post.view', { id: post.id })}
    >
      <article 
        className="border px-5 py-4 rounded-md shadow mb-5 w-full"
      >
        <div className="flex">
          <p className="text-lg font-semibold grow w-20 truncate">{post.title}</p>
        </div>
        <p className="text-xs truncate">{formatDate(post.created_at)}</p>
      </article>
    </Link>
  ));

  useEffect(() => {
    if (flash.token) {
      localStorage.setItem('imsToken', flash.token);
    }
  }, []);

  return (
    <HomeLayout>
      <main className="flex flex-col lg:flex-row py-5 px-2 sm:px-10">
        {auth.user.is_admin && (
          <div className="pe-10 pb-5 pt-2 px-12 lg:ps-0 lg:pt-5 sticky top-1 z-10">
            <Link
              className="bg-zinc-950 text-white px-4 py-2.5 rounded-md sticky top-1"
              href={route('post.add')}
            >
              Post
            </Link>
          </div>
        )}
        <div className="border bg-white flex-1 rounded p-5 sm:p-10 pb-2 sm:pb-5 shadow">
          {postList.length > 0 ? postList : <p className="mb-5 text-xl text-center text-zinc-500">You have no post yet.</p>}
        </div>
      </main>
    </HomeLayout>
  );
};

export default Dashboard;
