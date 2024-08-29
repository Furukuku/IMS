import DragNDrop from "@/Components/DragNDrop";
import InputField from "@/Components/InputField";
import { PostData } from "@/Interfaces/Post";
import Home from "@/Layouts/Home";
import { Link, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IoMdArrowBack, IoIosClose  } from "react-icons/io";

const AddPost = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { data, setData, post, processing, errors } = useForm<PostData>({
    title: '',
    description: '',
    is_uploadable: true,
    files: []
  });

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleIsUploadableChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setData({
      ...data,
      [e.target.name]: e.target.checked
    })
  };

  const handleRemoveFile = (index: number) => {
    files.splice(index, 1);
    setFiles([
      ...files
    ]);
  };

  const handlePostSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    post('/post/add');
  };

  useEffect(() => {
    setData('files', files);
  }, [files]);

  return (
    <Home>
      <main className="flex py-5 px-2 sm:px-10">
        <Link 
          href={route('dashboard')}
          className="pe-10 hidden lg:inline-block"
        >
          <IoMdArrowBack  className="text-2xl cursor-pointer" />
        </Link>
        <form 
          className="bg-white border rounded shadow p-5 sm:p-10 flex-1"
          onSubmit={handlePostSubmit}
        >
          <InputField 
            label="Title"
            value={data.title}
            setUserData={setData}
            fieldType="text"
            fieldName="title"
            disabled={processing}
            error={errors.title}
            id="title"
            style="flex flex-col mb-5"
          />
          <section className="flex flex-col mb-5">
            <label 
              htmlFor="description"
              className="mb-1"
            >
              Description
            </label>
            <textarea 
              id="description"
              name="description"
              value={data.description} 
              className="py-1.5 px-2 rounded resize-none h-40"
              onChange={handleDescriptionChange}
            />
            {errors.description && <p className="text-red-500 text-xs m-1">{errors.description}</p>}
          </section>
          <section className="flex items-center mb-5">
            <input 
              id="is_uploadable"
              type="checkbox"
              name="is_uploadable"
              checked={data.is_uploadable}
              className="rounded me-1"
              onChange={handleIsUploadableChange}
            />
            <label 
              htmlFor="is_uploadable"
              className="text-sm"
            >
              Students can upload file in this post.
            </label>
          </section>
          <DragNDrop 
            files={files}
            setFiles={setFiles}
          />
          {files.length > 0 && (
            <section className="mb-7">
              <ul className="flex flex-col gap-2">
                {files.map((file, index) => (
                  <li key={file.name}>
                    <div className={`flex justify-between items-center border rounded px-2 py-1 bg-zinc-100`}>
                      <p className="text-sm">{file.name}</p>
                      <IoIosClose 
                        className="cursor-pointer text-xl"
                        onClick={() => handleRemoveFile(index)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              {errors.files && <p className="text-red-500 text-xs m-1 mt-2">{errors.files}</p>}
              {Object.keys(errors).some(key => key.startsWith('files.')) && (
                <p className="text-red-500 text-xs m-1 mt-2">Invalid files. Please check the type and size of the files being uploaded.</p>
              )}
            </section>
          )}
          <button className="bg-zinc-950 text-white w-full py-2.5 rounded-md">Add Post</button>
        </form>
      </main>
    </Home>
  )
}

export default AddPost;
