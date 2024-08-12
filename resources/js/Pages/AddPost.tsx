import InputField from "@/Components/InputField";
import { PostData } from "@/Interfaces/Post";
import Home from "@/Layouts/Home";
import { useForm } from "@inertiajs/react";
import { ChangeEvent, DragEvent, FormEvent, useEffect, useRef, useState } from "react";
import { IoMdArrowBack, IoIosClose  } from "react-icons/io";

const AddPost = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [draggableElement, setDraggableElement] = useState<string>('');
  const fileInput = useRef<HTMLInputElement>(null);
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

  const handleBrowseClick = (): void => {
    if (fileInput.current)
      fileInput.current.click();
  };

  const handleAddFile = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const addedFiles = Array.from(selectedFiles).filter(curr => {
        const currFile = files.find(value => value.name === curr.name);
        return currFile === undefined;
      });

      setFiles([
        ...files,
        ...addedFiles
      ]);
    }
  };

  const handleFileDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleFileDrop = (e: DragEvent<HTMLElement>): void => {
    e.preventDefault();
    setDraggableElement('');
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles).filter(curr => {
        const currFile = files.find(value => value.name === curr.name);
        return currFile === undefined;
      });

      setFiles([
        ...files,
        ...newFiles
      ]);
    }
  };

  const handleRemoveFile = (index: number) => {
    files.splice(index, 1);
    setFiles([
      ...files
    ]);
  };

  const handlePostSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    post('/add-post');
  };

  useEffect(() => {
    setData('files', files);
  }, [files]);

  return (
    <Home>
      <main className="flex py-5 px-14 lg:px-10">
        <div className="pe-10">
          <IoMdArrowBack  className="text-2xl cursor-pointer" />
        </div>
        <form 
          className="bg-white border shadow p-10 flex-1"
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
          <input 
            type="file" 
            ref={fileInput}
            multiple
            hidden
            name="files"
            accept=".pdf,.docx,.pptx,.txt,.xlsx,.png,.jpg,.jpeg"
            onChange={handleAddFile}
          />
          <section
            className={`flex flex-col gap-2 items-center justify-center text-zinc-500 text-sm border-2 border-dashed ${draggableElement} rounded-md h-40 w-full p-5 mb-5`}
            onDrop={handleFileDrop}
            onDragOver={handleFileDragOver}
            onDragEnter={() => setDraggableElement('border-zinc-950')}
            onDragLeave={() => setDraggableElement('')}
          >
            <p className="text-center">
              Drop files here or 
              <button 
                type="button"
                className="underline text-blue-400 ms-1"
                onClick={handleBrowseClick}
              >
                browse.
              </button>
            </p>
            <p className="text-xs text-center">Supported files: PDF, DOCX, PPTX, TXT, XLSX, PNG, JPG, JPEG</p>
          </section>
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
