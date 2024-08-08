import Home from "@/Layouts/Home";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

const Dashboard = () => {
  const { flash } = usePage<PageProps>().props;

  return (
    <Home>
      <main className="flex flex-col lg:flex-row py-5 px-14 lg:px-10">
        <div className="pe-10 pb-5 pt-0 lg:pt-5 sticky top-1">
          <button
            className="bg-zinc-950 text-white px-4 py-2 rounded-md sticky top-1"
          >
            Post
          </button>
        </div>
        <div className="border bg-white flex-1 rounded p-10 pb-5">
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
          </article>
          <article className="border px-5 py-4 rounded-md shadow mb-5">
            <p className="text-lg font-semibold">Memorandum of Agreement</p>
            <p className="text-xs">July 4, 2024 - 5:30 PM</p>
          </article>
          <article className="border px-5 py-4 rounded-md shadow mb-5">
            <p className="text-lg font-semibold">Memorandum of Agreement</p>
            <p className="text-xs">July 4, 2024 - 5:30 PM</p>
          </article>
        </div>
      </main>
    </Home>
  );
};

export default Dashboard;
