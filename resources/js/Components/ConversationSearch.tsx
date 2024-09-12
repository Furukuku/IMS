import { User } from "@/types";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

const ConversationSearch = ({ setSearchUsers }: { setSearchUsers: Dispatch<SetStateAction<User[] | null>> }) => {
  const [keyword, setKeyword] = useState<string>('');

  const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setKeyword(e.target.value);
  };

  const searchUsers = async () => {
    try {
      const response: Response = await fetch(route('conversations.search', { keyword: keyword }));
      const data = await response.json();
      setSearchUsers(data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (keyword.length > 0) {
        searchUsers();
      } else {
        setSearchUsers(null);
      }
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [keyword]);

  return (
    <form className="mb-10 w-full px-4">
      <input
        type="text"
        className="text-sm px-2 py-2 w-full rounded border border-zinc-300"
        placeholder="Search..."
        value={keyword}
        onChange={handleSearchOnChange}
      />
    </form>
  );
};

export default ConversationSearch;
