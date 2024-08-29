import Home from "@/Layouts/Home";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { IoIosSend, IoMdArrowBack } from "react-icons/io";

const Messages = () => {
  const [isConvoActive, setIsConvoActive] = useState<boolean>(false); // sample
  const [sampleConvoTrigger, setSampleConvoTrigger] = useState(true); // sample

  /*
    CONTINUE HERE!!!
    TODO: Make this responsive
  */
  return (
    <Home>
      <main className="flex h-[calc(100dvh-49.6px)]">
        <nav className="flex flex-col items-center border h-full bg-white py-7 px-5 w-full sm:w-72">
          <form className="mb-10 w-full px-4">
            <input
              type="text"
              className="text-sm px-2 py-2 w-full rounded border border-zinc-300"
              placeholder="Search..."
            />
          </form>
          <ul className="divide-y-4 divide-transparent overflow-y-auto">
            <li>
              <Link 
                href=""
                className="flex gap-3 items-center py-2 px-4 rounded-lg hover:bg-zinc-50"
              >
                <img 
                  src="https://placehold.co/50X50" 
                  alt="profile picture" 
                  className="size-7 rounded-full"
                />
                <div className="grid divide-y-2 divide-transparent">
                  <section className="flex gap-4 justify-between items-center">
                    <p className="text-sm font-semibold truncate">John Doe</p>
                    <p className="text-[10px] font-semibold text-nowrap">12:44 PM</p>
                  </section>
                  <p className="w-full text-xs font-semibold truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum libero autem ipsa tenetur et earum quis fuga deleniti laboriosam? Eius explicabo ex, officiis, qui quo quisquam illo consectetur adipisci blanditiis harum tenetur ipsum a non distinctio nam corporis, reiciendis aliquam?</p>
                </div>
              </Link>
            </li>
            <li>
              <Link 
                href=""
                className="flex gap-3 items-center py-2 px-4 bg-zinc-100 rounded-lg hover:bg-zinc-50"
              >
                <img 
                  src="https://placehold.co/50X50" 
                  alt="profile picture" 
                  className="size-7 rounded-full"
                />
                <div className="grid divide-y-2 divide-transparent">
                  <section className="flex gap-4 justify-between items-center">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-[10px] font-medium text-nowrap">12:44 PM</p>
                  </section>
                  <p className="w-full text-xs truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum libero autem ipsa tenetur et earum quis fuga deleniti laboriosam? Eius explicabo ex, officiis, qui quo quisquam illo consectetur adipisci blanditiis harum tenetur ipsum a non distinctio nam corporis, reiciendis aliquam?</p>
                </div>
              </Link>
            </li>
            <li>
              <Link 
                href=""
                className="flex gap-3 items-center py-2 px-4 rounded-lg hover:bg-zinc-50"
              >
                <img 
                  src="https://placehold.co/50X50" 
                  alt="profile picture" 
                  className="size-7 rounded-full"
                />
                <div className="grid divide-y-2 divide-transparent">
                  <section className="flex gap-4 justify-between items-center">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-[10px] font-medium text-nowrap">12:44 PM</p>
                  </section>
                  <p className="w-full text-xs truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum libero autem ipsa tenetur et earum quis fuga deleniti laboriosam? Eius explicabo ex, officiis, qui quo quisquam illo consectetur adipisci blanditiis harum tenetur ipsum a non distinctio nam corporis, reiciendis aliquam?</p>
                </div>
              </Link>
            </li>
            <li>
              <Link 
                href=""
                className="flex gap-3 items-center py-2 px-4 rounded-lg hover:bg-zinc-50"
              >
                <img 
                  src="https://placehold.co/50X50" 
                  alt="profile picture" 
                  className="size-7 rounded-full"
                />
                <div className="grid divide-y-2 divide-transparent">
                  <section className="flex gap-4 justify-between items-center">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-[10px] font-medium text-nowrap">12:44 PM</p>
                  </section>
                  <p className="w-full text-xs truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum libero autem ipsa tenetur et earum quis fuga deleniti laboriosam? Eius explicabo ex, officiis, qui quo quisquam illo consectetur adipisci blanditiis harum tenetur ipsum a non distinctio nam corporis, reiciendis aliquam?</p>
                </div>
              </Link>
            </li>
            <li>
              <Link 
                href=""
                className="flex gap-3 items-center py-2 px-4 rounded-lg hover:bg-zinc-50"
              >
                <img 
                  src="https://placehold.co/50X50" 
                  alt="profile picture" 
                  className="size-7 rounded-full"
                />
                <div className="grid divide-y-2 divide-transparent">
                  <section className="flex gap-4 justify-between items-center">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-[10px] font-medium text-nowrap">12:44 PM</p>
                  </section>
                  <p className="w-full text-xs truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum libero autem ipsa tenetur et earum quis fuga deleniti laboriosam? Eius explicabo ex, officiis, qui quo quisquam illo consectetur adipisci blanditiis harum tenetur ipsum a non distinctio nam corporis, reiciendis aliquam?</p>
                </div>
              </Link>
            </li>
            <li>
              <Link 
                href=""
                className="flex gap-3 items-center py-2 px-4 rounded-lg hover:bg-zinc-50"
              >
                <img 
                  src="https://placehold.co/50X50" 
                  alt="profile picture" 
                  className="size-7 rounded-full"
                />
                <div className="grid divide-y-2 divide-transparent">
                  <section className="flex gap-4 justify-between items-center">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-[10px] font-medium text-nowrap">12:44 PM</p>
                  </section>
                  <p className="w-full text-xs truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum libero autem ipsa tenetur et earum quis fuga deleniti laboriosam? Eius explicabo ex, officiis, qui quo quisquam illo consectetur adipisci blanditiis harum tenetur ipsum a non distinctio nam corporis, reiciendis aliquam?</p>
                </div>
              </Link>
            </li>
            <li>
              <Link 
                href=""
                className="flex gap-3 items-center py-2 px-4 rounded-lg hover:bg-zinc-50"
              >
                <img 
                  src="https://placehold.co/50X50" 
                  alt="profile picture" 
                  className="size-7 rounded-full"
                />
                <div className="grid divide-y-2 divide-transparent">
                  <section className="flex gap-4 justify-between items-center">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-[10px] font-medium text-nowrap">12:44 PM</p>
                  </section>
                  <p className="w-full text-xs truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum libero autem ipsa tenetur et earum quis fuga deleniti laboriosam? Eius explicabo ex, officiis, qui quo quisquam illo consectetur adipisci blanditiis harum tenetur ipsum a non distinctio nam corporis, reiciendis aliquam?</p>
                </div>
              </Link>
            </li>
            <li>
              <Link 
                href=""
                className="flex gap-3 items-center py-2 px-4 rounded-lg hover:bg-zinc-50"
              >
                <img 
                  src="https://placehold.co/50X50" 
                  alt="profile picture" 
                  className="size-7 rounded-full"
                />
                <div className="grid divide-y-2 divide-transparent">
                  <section className="flex gap-4 justify-between items-center">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-[10px] font-medium text-nowrap">12:44 PM</p>
                  </section>
                  <p className="w-full text-xs truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum libero autem ipsa tenetur et earum quis fuga deleniti laboriosam? Eius explicabo ex, officiis, qui quo quisquam illo consectetur adipisci blanditiis harum tenetur ipsum a non distinctio nam corporis, reiciendis aliquam?</p>
                </div>
              </Link>
            </li>
            <li>
              <Link 
                href=""
                className="flex gap-3 items-center py-2 px-4 rounded-lg hover:bg-zinc-50"
              >
                <img 
                  src="https://placehold.co/50X50" 
                  alt="profile picture" 
                  className="size-7 rounded-full"
                />
                <div className="grid divide-y-2 divide-transparent">
                  <section className="flex gap-4 justify-between items-center">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-[10px] font-medium text-nowrap">12:44 PM</p>
                  </section>
                  <p className="w-full text-xs truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum libero autem ipsa tenetur et earum quis fuga deleniti laboriosam? Eius explicabo ex, officiis, qui quo quisquam illo consectetur adipisci blanditiis harum tenetur ipsum a non distinctio nam corporis, reiciendis aliquam?</p>
                </div>
              </Link>
            </li>
            <li>
              <Link 
                href=""
                className="flex gap-3 items-center py-2 px-4 rounded-lg hover:bg-zinc-50"
              >
                <img 
                  src="https://placehold.co/50X50" 
                  alt="profile picture" 
                  className="size-7 rounded-full"
                />
                <div className="grid divide-y-2 divide-transparent">
                  <section className="flex gap-4 justify-between items-center">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-[10px] font-medium text-nowrap">12:44 PM</p>
                  </section>
                  <p className="w-full text-xs truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum libero autem ipsa tenetur et earum quis fuga deleniti laboriosam? Eius explicabo ex, officiis, qui quo quisquam illo consectetur adipisci blanditiis harum tenetur ipsum a non distinctio nam corporis, reiciendis aliquam?</p>
                </div>
              </Link>
            </li>
            <li>
              <Link 
                href=""
                className="flex gap-3 items-center py-2 px-4 rounded-lg hover:bg-zinc-50"
              >
                <img 
                  src="https://placehold.co/50X50" 
                  alt="profile picture" 
                  className="size-7 rounded-full"
                />
                <div className="grid divide-y-2 divide-transparent">
                  <section className="flex gap-4 justify-between items-center">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-[10px] font-medium text-nowrap">12:44 PM</p>
                  </section>
                  <p className="w-full text-xs truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum libero autem ipsa tenetur et earum quis fuga deleniti laboriosam? Eius explicabo ex, officiis, qui quo quisquam illo consectetur adipisci blanditiis harum tenetur ipsum a non distinctio nam corporis, reiciendis aliquam?</p>
                </div>
              </Link>
            </li>
            <li>
              <Link 
                href=""
                className="flex gap-3 items-center py-2 px-4 rounded-lg hover:bg-zinc-50"
              >
                <img 
                  src="https://placehold.co/50X50" 
                  alt="profile picture" 
                  className="size-7 rounded-full"
                />
                <div className="grid divide-y-2 divide-transparent">
                  <section className="flex gap-4 justify-between items-center">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-[10px] font-medium text-nowrap">12:44 PM</p>
                  </section>
                  <p className="w-full text-xs truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum libero autem ipsa tenetur et earum quis fuga deleniti laboriosam? Eius explicabo ex, officiis, qui quo quisquam illo consectetur adipisci blanditiis harum tenetur ipsum a non distinctio nam corporis, reiciendis aliquam?</p>
                </div>
              </Link>
            </li>
            <li>
              <Link 
                href=""
                className="flex gap-3 items-center py-2 px-4 rounded-lg hover:bg-zinc-50"
              >
                <img 
                  src="https://placehold.co/50X50" 
                  alt="profile picture" 
                  className="size-7 rounded-full"
                />
                <div className="grid divide-y-2 divide-transparent">
                  <section className="flex gap-4 justify-between items-center">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-[10px] font-medium text-nowrap">12:44 PM</p>
                  </section>
                  <p className="w-full text-xs truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum libero autem ipsa tenetur et earum quis fuga deleniti laboriosam? Eius explicabo ex, officiis, qui quo quisquam illo consectetur adipisci blanditiis harum tenetur ipsum a non distinctio nam corporis, reiciendis aliquam?</p>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
        {sampleConvoTrigger && (
          <div className="flex-1 hidden sm:block">
            <header className="flex gap-4 items-center border-b bg-white py-1.5 px-3">
              <Link 
                href=""
                className="text-xl block sm:hidden"
              >
                <IoMdArrowBack />
              </Link> 
              <img 
                src="https://placehold.co/200x200" 
                alt="profile picture" 
                className="size-8 rounded-full"
              />
              <p className="flex-1 w-20 grow font-semibold truncate">John Doe</p>
            </header>
            <div className="bg-white h-[calc(100dvh-(48.8px+49.6px))] relative">
              <main className="shadow-inner divide-y-[50px] divide-transparent h-[calc(100%-76.8px)] overflow-y-auto p-4">
                <article className="flex justify-start">
                  <div className="flex gap-2 basis-9/12">
                    <img 
                      src="http://placehold.co/200x200" 
                      alt="profile picture" 
                      className="size-6 rounded-full"
                    />
                    <div className="divide-y-4 divide-transparent">
                      <p className="bg-zinc-200 px-5 py-3 rounded-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores maxime distinctio quia beatae perferendis doloribus laudantium ut unde. Asperiores accusamus esse quasi blanditiis praesentium necessitatibus ipsa neque, odit non consequuntur labore accusantium debitis aliquam a quibusdam facilis numquam repudiandae provident quidem. Velit a id veritatis consectetur quibusdam quas sunt autem veniam qui maiores, excepturi repellendus totam tempore molestiae facilis sit corporis rerum eius expedita dicta assumenda! Vel nam neque perspiciatis! Enim quasi tenetur possimus rem sint molestias eum dolores vitae at aliquid dicta neque distinctio, nostrum eligendi perspiciatis veniam cumque mollitia quaerat dolor animi, voluptates nam corrupti non. Porro, eos!</p>
                      <p className="text-xs font-medium text-zinc-600 px-2">3:49 PM</p>
                    </div>
                  </div>
                </article>
                <article className="flex justify-end">
                  <div className="flex gap-2 basis-9/12">
                    <div className="divide-y-4 divide-transparent">
                      <p className="bg-zinc-900 text-white px-5 py-3 rounded-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores maxime distinctio quia beatae perferendis doloribus laudantium ut unde. Asperiores accusamus esse quasi blanditiis praesentium necessitatibus ipsa neque, odit non consequuntur labore accusantium debitis aliquam a quibusdam facilis numquam repudiandae provident quidem. Velit a id veritatis consectetur quibusdam quas sunt autem veniam qui maiores, excepturi repellendus totam tempore molestiae facilis sit corporis rerum eius expedita dicta assumenda! Vel nam neque perspiciatis! Enim quasi tenetur possimus rem sint molestias eum dolores vitae at aliquid dicta neque distinctio, nostrum eligendi perspiciatis veniam cumque mollitia quaerat dolor animi, voluptates nam corrupti non. Porro, eos!</p>
                      <p className="text-end text-xs font-medium text-zinc-600 px-2">3:49 PM</p>
                    </div>
                  </div>
                </article>
                <article className="flex justify-end">
                  <div className="flex gap-2 basis-9/12">
                    <div className="divide-y-4 divide-transparent">
                      <p className="bg-zinc-900 text-white px-5 py-3 rounded-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores maxime distinctio quia beatae perferendis doloribus laudantium ut unde. Asperiores accusamus esse quasi blanditiis praesentium necessitatibus ipsa neque, odit non consequuntur labore accusantium debitis aliquam a quibusdam facilis numquam repudiandae provident quidem. Velit a id veritatis consectetur quibusdam quas sunt autem veniam qui maiores, excepturi repellendus totam tempore molestiae facilis sit corporis rerum eius expedita dicta assumenda! Vel nam neque perspiciatis! Enim quasi tenetur possimus rem sint molestias eum dolores vitae at aliquid dicta neque distinctio, nostrum eligendi perspiciatis veniam cumque mollitia quaerat dolor animi, voluptates nam corrupti non. Porro, eos!</p>
                      <p className="text-end text-xs font-medium text-zinc-600 px-2">3:49 PM</p>
                    </div>
                  </div>
                </article>
              </main>
              <form className="flex gap-3 items-center justify-end bg-white absolute inset-x-0 shadow bottom-0 border-t py-4 px-10">
                <textarea
                  placeholder="Write something..."
                  className="rounded-md resize-none h-11 px-2 py-1 text-sm border-zinc-300 transition-all w-96 focus:flex-1"
                />
                <button className="bg-zinc-950 text-white px-3 py-2.5 text-2xl rounded-md">
                  <IoIosSend />
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </Home>
  );
};

export default Messages;
