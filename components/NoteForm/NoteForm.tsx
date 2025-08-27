'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';
import { useMutation } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { NewNote } from '@/types/note';

type Props = {
  tags: NoteTag[];
};

const NoteForm = ({ tags }: Props) => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<NoteTag>(tags[0]);

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      router.push('/notes/filter/all');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newNote: NewNote = { title, content, tag };
    mutate(newNote);
  };

  /*   const handleSubmit = (formData: FormData) => {
    const raw = Object.fromEntries(formData) as Record<string, string>;
    const newNote: NewNote = {
      title: raw.title,
      content: raw.content,
      tag: raw.tag as NoteTag,
    };
    mutate(newNote);
  }; */

  const handleCancel = () => {
    router.push('/notes/filter/all');
  };

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit} /* action={handleSubmit} */
    >
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={tag}
          onChange={e => setTag(e.target.value as NoteTag)}
        >
          {tags.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
