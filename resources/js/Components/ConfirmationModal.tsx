import { useForm } from "@inertiajs/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ConfirmationModalProps {
    header: string;
    message: string;
    btnText: string;
    id?: number;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    routeName: string;
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    params?: {
      [key: string]: unknown
    }
}

const ConfirmationModal = ({ header, message, btnText, id, setShowModal, routeName, method, params = {} }: ConfirmationModalProps) => {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const { get, post, put, patch, delete: deleteRouter } = useForm({
    id: id
  });

  const handleConfirmClick = (): void => {
    if (method === 'get') {
      get(route(routeName, params));
    } else if (method === 'post') {
      post(route(routeName, params));
    } else if (method === 'put') {
      put(route(routeName, params));
    } else if (method === 'patch') {
      patch(route(routeName, params));
    } else if (method === 'delete') {
      deleteRouter(route(routeName, params));
    }

    setShowModal(false);
  };

  const handleBackDropClick = (): void => {
    setIsInvalid(true);
  };

  useEffect(() => {
    const invalidTimer = setTimeout(() => {
      if (isInvalid) {
        setIsInvalid(false);
      }
    }, 300);

    return () => {
      clearTimeout(invalidTimer);
    };

  }, [isInvalid]);

  return (
    <div 
      className={`fixed inset-0 transition ease-in-out duration-300 ${isInvalid ? 'scale-105' : 'scale-100'} z-20 flex justify-center items-center bg-zinc-950 bg-opacity-25 animate-[show_80ms_ease-in-out]`}
      onClick={handleBackDropClick}
    >
      <article 
        className="bg-white rounded-lg shadow border max-w-lg px-6 pt-8 pb-5 mx-5"
        onClick={e => e.stopPropagation()}
      >
        <p className="text-xl font-semibold mb-2">{header}</p>
        <p className="text-zinc-700 mb-4 text-wrap">{message}</p>
        <div className="flex justify-end gap-3">
          <button 
            className="shadow-sm border rounded-md px-3 py-2 hover:bg-zinc-100"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button 
            className="bg-zinc-950 shadow-sm border rounded-md text-white px-3 py-2 hover:bg-opacity-90"
            onClick={handleConfirmClick}
          >
            {btnText}
          </button>
        </div>
      </article>
    </div>
  );
};

export default ConfirmationModal;
