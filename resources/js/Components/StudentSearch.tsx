import { useForm } from "@inertiajs/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";


const StudentSearch = ({ status, search }: { status: string; search: string }) => {
  const [isSearchEmpty, setIsSearchEmpty] = useState<boolean>(false); 
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data, setData, get, isDirty } = useForm<{ status?: string; search: string }>(status == 'All' ? {
    search: search.length > 0 ? search : ''
  } : {
    status: status,
    search: search.length > 0 ? search : ''
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ 
      ...data,
      search: e.target.value 
    });


    if (e.target.value.length < 1) {
      setIsSearchEmpty(true);
    }
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (isDirty || isSearchEmpty) {
        get(route('students'), { preserveState: true });
        setIsSearchEmpty(false);
      }
    }, 900);

    return () => clearTimeout(debounceSearch);
  }, [data]);

  return (
    <form>
      <input 
        type="text"
        className="w-60 rounded px-2 py-1 border-1 border-zinc-400 placeholder:text-sm" 
        placeholder="Search..."
        ref={inputRef}
        value={data.search}
        onChange={handleOnChange}
      />
    </form>
  );
};

export default StudentSearch;
