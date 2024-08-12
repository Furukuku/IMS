import { formatDate } from "@/helpers/date";
import Home from "@/Layouts/Home";
import { PageProps, Post } from "@/types";
import { Link, usePage } from "@inertiajs/react";

const Dashboard = ({ posts }: { posts: Post[] }) => {
  const { message } = usePage<PageProps>().props.flash;
  const postList = posts.map(post => (
    <article 
      key={post.id}
      className="border px-5 py-4 rounded-md shadow mb-5"
    >
      <p className="text-lg font-semibold">{post.title}</p>
      <p className="text-xs">{formatDate(post.created_at)}</p>
    </article>
  ));

  return (
    <Home>
      <main className="flex flex-col lg:flex-row py-5 px-14 lg:px-10">
        <div className="pe-10 pb-5 pt-0 lg:pt-5 sticky top-1">
          <Link
            className="bg-zinc-950 text-white px-4 py-2.5 rounded-md sticky top-1"
            href="/add-post"
          >
            Post
          </Link>
        </div>
        <div className="border bg-white flex-1 rounded p-10 pb-5 shadow">
          {postList.length > 0 ? postList : <p className="mb-5 text-xl text-center text-zinc-500">You have no post yet.</p>}
          {/* <article className="border px-5 py-4 rounded-md shadow mb-5">
            <p className="text-lg font-semibold">Memorandum of Agreement</p>
            <p className="text-xs">July 4, 2024 - 5:30 PM</p>
          </article>
          <article className="border px-5 py-4 rounded-md shadow mb-5">
            <p className="text-lg font-semibold">Memorandum of Agreement</p>
            <p className="text-xs">July 4, 2024 - 5:30 PM</p>
          </article>
          <article className="border px-5 py-4 rounded-md shadow mb-5">
            <p className="text-lg font-semibold">Memorandum of Agreement</p>
            <p className="text-xs">July 4, 2024 - 5:30 PM</p>
          </article>
          <article className="border px-5 py-4 rounded-md shadow mb-5">
            <p className="text-lg font-semibold">Memorandum of Agreement</p>
            <p className="text-xs">July 4, 2024 - 5:30 PM</p>
          </article>
          <article className="border px-5 py-4 rounded-md shadow mb-5">
            <p className="text-lg font-semibold">Memorandum of Agreement</p>
            <p className="text-xs">July 4, 2024 - 5:30 PM</p>
          </article>
          <article className="border px-5 py-4 rounded-md shadow mb-5">
            <p className="text-lg font-semibold">Memorandum of Agreement</p>
            <p className="text-xs">July 4, 2024 - 5:30 PM</p>
          </article>
          <article className="border px-5 py-4 rounded-md shadow mb-5">
            <p className="text-lg font-semibold">Memorandum of Agreement</p>
            <p className="text-xs">July 4, 2024 - 5:30 PM</p>
          </article>
          <article className="border px-5 py-4 rounded-md shadow mb-5">
            <p className="text-lg font-semibold">Memorandum of Agreement</p>
            <p className="text-xs">July 4, 2024 - 5:30 PM</p>
          </article>
          <article className="border px-5 py-4 rounded-md shadow mb-5">
            <p className="text-lg font-semibold">Memorandum of Agreement</p>
            <p className="text-xs">July 4, 2024 - 5:30 PM</p>
          </article> */}
        </div>
      </main>
    </Home>
  );
};

export default Dashboard;
