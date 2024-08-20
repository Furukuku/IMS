import { Comment, Reply } from "@/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type VisibleData = Comment[] | Reply[];

interface ShowMoreProps {
  dataCount: number;
  visibleData: VisibleData;
  isProcessing: boolean;
  handleShowMoreClick: () => {};
  showData?: boolean;
}

const ShowMoreButton = ({ 
  dataCount, 
  visibleData, 
  isProcessing, 
  handleShowMoreClick, 
  showData = true 
}: ShowMoreProps) => {

  if (dataCount == visibleData.length || visibleData.length < 1 || !showData) return undefined;

  return (
    <section className="flex flex-col items-center gap-1 mb-10">
      {dataCount != visibleData.length && (
        <>
          <button 
            className="text-sm underline"
            onClick={handleShowMoreClick}
          >
            Show more
          </button>
          {isProcessing && <AiOutlineLoading3Quarters className="animate-spin" />}
        </>
      )}
    </section>
  );
};

export default ShowMoreButton;
