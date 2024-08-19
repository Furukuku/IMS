

const Reply = () => {
  return (
    <li className="ps-5">
      <section className="flex items-center gap-2 mb-1">
        <img 
          src="https://placehold.co/50" 
          alt="profile picture" 
          className="rounded-full size-5"
        />
        <p className="text-sm font-semibold">John Doe</p>
      </section>
      <section className="px-6">
        <p className="text-sm text-zinc-800 mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate tenetur ullam voluptatum corrupti ratione nesciunt itaque accusantium officiis hic quia.</p>
      </section>
    </li>
  );
};

export default Reply;
