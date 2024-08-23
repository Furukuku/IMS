import { useForm } from "@inertiajs/react";
import { Dispatch, SetStateAction } from "react";

const DeleteModal = ({ id, setShowModal }: { id: number; setShowModal: Dispatch<SetStateAction<boolean>> }) => {
  const { delete: deleteRouter } = useForm({
    post_id: id
  });

  const handleDeleteClick = (): void => {
    deleteRouter(route('post.destroy'));
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-20 flex justify-center items-center bg-zinc-950 bg-opacity-25 animate-[show_80ms_ease-in-out]">
      <article className="bg-white rounded-lg shadow border max-w-lg px-6 pt-8 pb-5 mx-5">
        <p className="text-xl font-semibold mb-2">Delete "Third" Post?</p>
        <p className="text-zinc-700 mb-4 text-wrap">Are you sure you want to delete this post? This will permanently delete the post!</p>
        <div className="flex justify-end gap-3">
          <button 
            className="shadow-sm border rounded-md px-3 py-2 hover:bg-zinc-100"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button 
            className="bg-zinc-950 shadow-sm border rounded-md text-white px-3 py-2 hover:bg-opacity-90"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </article>
    </div>
  );
};

export default DeleteModal;
