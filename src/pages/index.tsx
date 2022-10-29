import type { NextPage } from "next";
import { useState } from "react";
import { toast } from "react-toastify";
import NoteModal from "~/components/note.modal";
import CreateNote from "~/components/notes/create.note";
import NoteItem from "~/components/notes/note.component";
import { trpc } from "~/utils/trpc";

const Home: NextPage = () => {
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const { data: notes } = trpc.getNotes.useQuery(
    { limit: 10, page: 1 },
    {
      staleTime: 5 * 1000,
      select: (data) => data.notes,
      onError(err) {
        toast(err.message, {
          type: "error",
          position: "top-right",
        });
      },
    }
  );
  return (
    <div className="2xl:max-w-[90rem] max-w-[68rem] mx-auto">
      <div className="m-8 grid grid-cols-[repeat(auto-fill,_320px)] gap-7">
        <div className="p-4 h-72 bg-white rounded-lg border border-gray-200 shadow-md flex flex-col items-center justify-center">
          <div
            onClick={() => setOpenNoteModal(true)}
            className="flex items-center justify-center h-20 w-20 border-2 border-dashed border-ct-blue-600 rounded-full text-ct-blue-600 text-5xl cursor-pointer"
          >
            <i className="bx bx-plus"></i>
          </div>
          <h4
            onClick={() => setOpenNoteModal(true)}
            className="text-lg font-medium text-ct-blue-600 mt-5 cursor-pointer"
          >
            Add new note
          </h4>
        </div>
        {/* Note Items */}

        {notes?.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}

        {/* Create Note Modal */}
        <NoteModal
          openNoteModal={openNoteModal}
          setOpenNoteModal={setOpenNoteModal}
        >
          <CreateNote setOpenNoteModal={setOpenNoteModal} />
        </NoteModal>
      </div>
    </div>
  );
};

export default Home;
