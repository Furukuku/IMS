import { ChangeEvent, DragEvent, MouseEventHandler, useRef, useState } from "react";

type setDataByObject<TForm> = (data: TForm) => void;

interface DragNDropProps {
  files: File[];
  setFiles: setDataByObject<File[]>;
}

const DragNDrop = ({ files, setFiles }: DragNDropProps) => {
  const [draggableElement, setDraggableElement] = useState<string>('');
  const fileInput = useRef<HTMLInputElement>(null);

  const handleBrowseClick: MouseEventHandler<HTMLButtonElement> = (): void => {
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

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    if (e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget)) {
      return;
    }
    
    setDraggableElement('');
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

  return (
    <>
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
        onDragLeave={handleDragLeave}
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
    </>
  );
};

export default DragNDrop;
