import ConfirmationModal from "@/Components/ConfirmationModal";
import StudentCategories from "@/Components/StudentCategories";
import StudentRow from "@/Components/StudentRow";
import Home from "@/Layouts/Home";
import { PageProps, User } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export type StudentOptionProp = {
  id: number;
  fullName: string;
  status: string;
  isSelected: boolean;
  modalProps?: DOMRect;
} | null;

const Students = ({ students }: { students: User[] }) => {
  const [studentOptionProp, setStudentOptionProp] = useState<StudentOptionProp>(null);
  const [showActionModal, setShowActionModal] = useState<boolean>(false);
  const [showArchiveModal, setShowArchiveModal] = useState<boolean>(false);
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false);
  const [showUnarchiveModal, setShowUnarchiveModal] = useState<boolean>(false);
  const actionModalElement = useRef<HTMLUListElement | null>(null);
  const { url, props }: { url: string; props: PageProps } = usePage();
  const urlQuery = url.slice(17);
  const message = props.flash;
  const handleActionModalClose = (): void => {
    setStudentOptionProp(null);
    setShowActionModal(false);
  };

  const handleShowArchiveModal = (): void => {
    setShowArchiveModal(true);
    setShowActionModal(false);
  };

  const handleShowUnarchiveModal = (): void => {
    setShowUnarchiveModal(true);
    setShowActionModal(false);
  }

  const handleShowApproveModal = (): void => {
    setShowApproveModal(true);
    setShowActionModal(false);
  };

  useEffect(() => {
    if (studentOptionProp?.modalProps && actionModalElement.current) {
      const optionProps = studentOptionProp.modalProps;
      actionModalElement.current.style.left = optionProps.left - actionModalElement.current.getBoundingClientRect().width + (optionProps.width / 2) + 'px';
      actionModalElement.current.style.top = optionProps.top + (optionProps.height / 2) + 'px';
    }
  }, [studentOptionProp]);

  return (
    <Home>
      <main className="py-5 px-2 sm:px-10">
        <div className="flex bg-white border shadow p-4 rounded-md">
          <div className="bg-white overflow-x-auto w-40 grow">
          <div className="p-6 inline-block w-full">
            <div className="flex items-end justify-between mb-3">
              <StudentCategories />
              <form>
                <input 
                  type="text"
                  className="w-60 rounded px-2 py-1 border-1 border-zinc-400 placeholder:text-sm" 
                  placeholder="Search..."
                />
              </form>
            </div>
              <table className="divide-y w-full">
                <thead className="whitespace-nowrap">
                  <tr>
                    <th scope="col" className="text-start px-6 py-4 text-sm text-zinc-500 uppercase">Full Name</th>
                    <th scope="col" className="text-start px-6 py-4 text-sm text-zinc-500 uppercase">Student No.</th>
                    <th scope="col" className="text-start px-6 py-4 text-sm text-zinc-500 uppercase">Company Name</th>
                    <th scope="col" className="text-start px-6 py-4 text-sm text-zinc-500 uppercase">Company Address</th>
                    <th scope="col" className="text-center px-6 py-4 text-sm text-zinc-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (students.map(student => (
                    <StudentRow
                      key={student.id}
                      student={student}
                      // actionModal={studentOptionProp}
                      setActionModal={setStudentOptionProp}
                      showActionModal={setShowActionModal}
                    />
                  ))): (
                    <tr>
                      <td colSpan={6} className="text-xl text-zinc-500 font-medium text-center pt-5">No students</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          {showActionModal && (
            <>
              <ul 
                ref={actionModalElement} 
                className={`absolute text-sm bg-white z-30 py-2 rounded shadow-md border animate-[show_80ms_ease-in-out]`}
              >
                {studentOptionProp?.status === 'Archive' ? (
                  <li>
                    <button 
                      className="px-3 py-1 w-full text-start hover:bg-zinc-200"
                      onClick={handleShowUnarchiveModal}
                    >
                      Unarchive
                    </button>
                  </li>
                ) : (
                  <li>
                    <button 
                      className="px-3 py-1 w-full text-start hover:bg-zinc-200"
                      onClick={handleShowArchiveModal}
                    >
                      Archive
                    </button>
                  </li>
                )}
                <li>
                  <button 
                    className="px-3 py-1 w-full text-start hover:bg-zinc-200"
                    onClick={handleShowApproveModal}
                  >
                    Approve
                  </button>
                </li>
              </ul>
              <div 
                className="fixed inset-0 bg-zinc-950 bg-opacity-5 z-20" 
                onClick={handleActionModalClose}
              />
            </>
          )}
          {showArchiveModal && (
            <ConfirmationModal 
              header={`Archive "${studentOptionProp?.fullName}"?`}
              message="Are you sure you want to archive this student?"
              btnText="Archive"
              id={studentOptionProp?.id}
              setShowModal={setShowArchiveModal}
              routeName="student.archive"
              method="patch"
              params={urlQuery != '' ? { status: urlQuery } : {}}
            />
          )}
          {showUnarchiveModal && (
            <ConfirmationModal 
              header={`Unarchive "${studentOptionProp?.fullName}"?`}
              message="Are you sure you want to unarchive this student? This will set its account to active."
              btnText="Unarchive"
              id={studentOptionProp?.id}
              setShowModal={setShowUnarchiveModal}
              routeName="student.approve"
              method="patch"
              params={urlQuery != '' ? { status: urlQuery } : {}}
            />
          )}
          {showApproveModal && (
            <ConfirmationModal 
              header={`Approve "${studentOptionProp?.fullName}"?`}
              message="Are you sure you want to approve this student? You cannot revert this! But you can archive it later if you want to."
              btnText="Approve"
              id={studentOptionProp?.id}
              setShowModal={setShowApproveModal}
              routeName="student.approve"
              method="patch"
              params={urlQuery != '' ? { status: urlQuery } : {}}
            />
          )}
          </div>
        </div>
      </main>
    </Home>
  );
};

export default Students;
