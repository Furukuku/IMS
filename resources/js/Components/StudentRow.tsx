import { User } from "@/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { StudentOptionProp } from "@/Pages/Students";

const StudentRow = ({ 
  student, 
  // actionModal, 
  setActionModal,
  showActionModal 
}: { 
  student: User; 
  // actionModal: StudentOptionProp; 
  setActionModal: Dispatch<SetStateAction<StudentOptionProp>>,
  showActionModal: Dispatch<SetStateAction<boolean>> 
}) => {
  // const [buttonPosition, setButtonPosition] = useState<DOMRect | null>(null);
  const actionBtnElement = useRef<HTMLButtonElement | null>(null);
  const handleActionClick = (): void => {
    setActionModal({
      id: student.id,
      fullName: student.first_name + ' ' + student.last_name,
      status: student.status,
      isSelected: true,
      modalProps: actionBtnElement.current?.getBoundingClientRect()
    });
    showActionModal(true);
  };

  // SOLUTION 1
  // useEffect(() => {
  //   const updatePosition = () => {
  //      if (actionBtnElement.current) {
  //       const rect = actionBtnElement.current.getBoundingClientRect();
  //       setButtonPosition(rect);
  //      }
  //   };

  //   const observer = new ResizeObserver(updatePosition);
  //   if (actionBtnElement.current) {
  //     observer.observe(actionBtnElement.current);
  //   }

  //   updatePosition();

  //   window.addEventListener('resize', updatePosition);

  //   return () => {
  //     if (actionBtnElement.current) {
  //       observer.unobserve(actionBtnElement.current);
  //     }

  //     window.removeEventListener('resize', updatePosition);
  //   }

  // }, [actionModal?.isSelected]);

  // useEffect(() => {
  //   if (actionModal?.isSelected && buttonPosition) {
  //     setActionModal({
  //       ...actionModal,
  //       modalProps: buttonPosition
  //     })
  //   }

  // }, [buttonPosition]);

  // SOLUTION 2
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (actionBtnElement.current) {
  //       const rect = actionBtnElement.current.getBoundingClientRect();
  //       setButtonPosition(rect);
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (actionModal && buttonPosition) {
  //     setActionModal({
  //       ...actionModal,
  //       modalProps: buttonPosition
  //     });
  //   }
  // }, [buttonPosition]);

  const setBgColor = (status: string): string => {
    if (status == 'Active') return 'bg-green-500';
    if (status == 'Approval') return 'bg-amber-400';
    if (status == 'Archive') return 'bg-zinc-400';
    return '';
  };

  return (
    <tr className="odd:bg-zinc-100 even:bg-white">
      <td className="px-6 py-3 text-sm">{student.first_name} {student.last_name}</td>
      <td className="px-6 py-3 text-sm">{student.student_no}</td>
      <td className="px-6 py-3 text-sm">{student.company_name}</td>
      <td className="px-6 py-3 text-sm">{student.company_address}</td>
      <td className="px-6 py-3 text-xs grid place-items-center">
        <div className={`${setBgColor(student.status)} text-center text-white py-1 w-16 rounded-full`}>
          {student.status == 'Archive' ? 'Archived' : student.status}
        </div>
      </td>
      <td className="px-6 py-3 text-sm text-center">
        <div className="inline-block">
          <button 
            ref={actionBtnElement}
            onClick={handleActionClick}
          >
            <SlOptionsVertical />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StudentRow;
