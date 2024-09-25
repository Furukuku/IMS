import Posts from "@/Components/Posts";
import HomeLayout from "@/Layouts/HomeLayout";
import { PageProps, Post } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

const Dashboard = ({ posts }: { posts: Post[] }) => {
  const { flash, auth } = usePage<PageProps>().props;
  const [currPosts, setCurrPosts] = useState<Post[]>(posts);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const initialLoad = useRef<boolean>(true);
  const botElement = useRef<HTMLParagraphElement | null>(null);

  const getMorePosts = async () => {
    try {
      const response = await fetch(route('post.show-more', { skip: currPosts.length, limit: 10 }));
      const data = await response.json();
      setCurrPosts(prev => [...prev, ...data]);
      setHasMore(!(data.length < 10));
    } catch (err) {
      console.log(err);
    }
  };

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      getMorePosts();
    }

  };

  useEffect(() => {
    if (flash.token) {
      localStorage.setItem('imsToken', flash.token);
    }
    
    const observer = new IntersectionObserver(observerCallback);

    if (botElement.current && observer) {
      observer.observe(botElement.current);
    }

    if (initialLoad.current) initialLoad.current = false;

    return () => {
      if (botElement.current && observer) {
        observer.unobserve(botElement.current);
      }
    }
  }, [currPosts, botElement.current, initialLoad.current]);

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
          {currPosts.length > 0 ? (
            <Posts posts={currPosts} /> 
          ): (
            <p className="mb-5 text-xl text-center text-zinc-500">{auth.user.is_admin ? 'You have no post yet.' : 'No posts available.'}</p>
          )}
          {(!initialLoad.current && hasMore && currPosts.length > 0) && 
            <p ref={botElement} className="text-xl">
              <BiLoaderAlt className="mx-auto animate-spin duration-300" />
            </p>
          }
        </div>
      </main>
    </HomeLayout>
  );
};

export default Dashboard;
