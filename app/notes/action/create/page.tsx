import type { NoteTag } from '@/types/note';
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

const staticTags: NoteTag[] = [
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Todo',
];

export const getTags = async (): Promise<NoteTag[]> => {
  return staticTags;
};

const CreateNote = async () => {
  const allTags = await getTags();

  return (
    <main className={css.main}>
      <div className={css.container}>x
        <h1 className={css.title}>Create note</h1>
        <NoteForm tags={allTags}/>
      </div>
    </main>
  );
};

export default CreateNote;
