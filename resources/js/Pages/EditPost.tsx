import DragNDrop from "@/Components/DragNDrop";
import InputField from "@/Components/InputField";
import { PostData } from "@/Interfaces/Post";
import Home from "@/Layouts/Home";
import { File as FileData, Post } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { IoIosClose, IoMdArrowBack } from "react-icons/io";


const EditPost = ({ post }: { post: Post }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [oldFiles, setOldFiles] = useState<FileData[]>(post.files);
  const [removedFiles, setRemovedFiles] = useState<number[]>([]);
  const { data, setData, post: postData, processing, errors } = useForm<PostData>({
    _method: 'put',
    id: post.id,
    title: post.title,
    description: post.description,
    is_uploadable: post.is_uploadable,
    removed_files: [],
    files: []
  });

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setData({
      ...data,
      description: e.target.value
    })
  };

  const handleIsUploadableChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setData({
      ...data,
      is_uploadable: e.target.checked
    })
  };

  const handleRemoveFile = (index: number) => {
    files.splice(index, 1);
    setFiles([
      ...files
    ]);
  };

  const handleRemoveOldFile = (id: number) => {
    setRemovedFiles([
      ...removedFiles,
      id
    ]);
    const remainingFiles = oldFiles.filter((file) => file.id !== id);
    setOldFiles(remainingFiles);
  };

  const handlePostUpdate = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    postData(route('post.update'));
  };

  watchChanged(() => {
    setData('files', files);
  }, files);

  watchChanged(() => {
    setData('removed_files', removedFiles);
  }, removedFiles);

  return (
    <Home>
      <main className="flex py-5 px-14 lg:px-10">
      <Link 
          href={route('dashboard')}
          className="pe-10"
        >
          <IoMdArrowBack  className="text-2xl cursor-pointer" />
        </Link>
        <form 
          className="bg-white border shadow p-10 flex-1"
          onSubmit={handlePostUpdate}
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
          {(files.length > 0 || oldFiles.length > 0) && (
            <section className="mb-7">
              <ul className="flex flex-col gap-2">
                {oldFiles.length > 0 && (
                  <>
                  {oldFiles.map((file) => (
                    <li key={file.id}>
                      <div className={`flex justify-between items-center border rounded px-2 py-1 bg-zinc-100`}>
                        <p className="text-sm">{file.path}</p>
                        <IoIosClose 
                          className="cursor-pointer text-xl"
                          onClick={() => handleRemoveOldFile(file.id)}
                        />
                      </div>
                    </li>
                  ))}
                  </>
                )}
                {files.length > 0 && (
                  <>
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
                  </>
                )}
              </ul>
              {errors.files && <p className="text-red-500 text-xs m-1 mt-2">{errors.files}</p>}
              {Object.keys(errors).some(key => key.startsWith('files.')) && (
                <p className="text-red-500 text-xs m-1 mt-2">Invalid files. Please check the type and size of the files being uploaded.</p>
              )}
            </section>
          )}
          <button 
            className="bg-zinc-950 text-white w-full py-2.5 rounded-md"
            type="submit"
          >
            Update Post
          </button>
        </form>
      </main>
    </Home>
  );
};

const watchChanged = (callback: () => void, dependency: any) => {
  useEffect(() => {
    callback();
  }, [dependency]);
};

export default EditPost;
