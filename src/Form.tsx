import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createPost } from './api/posts';
import { KEY_POSTS } from './constants';
import { CurrentPost } from './types';

const Form = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const queryClient = useQueryClient();

  const postsMutation = useMutation({
    mutationFn: (currentPost: CurrentPost) => createPost(currentPost),
    mutationKey: [KEY_POSTS],
    onSuccess: () => {
      queryClient.invalidateQueries([KEY_POSTS]);
      handleClearForm();
    },
  });

  const handleClearForm = () => {
    setNewTitle('');
    setNewBody('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postsMutation.mutate({
      title: newTitle,
      body: newBody,
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="title">
          Title:
          <input
            id="title"
            type="text"
            onChange={(e) => setNewTitle(e.currentTarget.value)}
            value={newTitle}
          />
        </label>
      </div>
      <div>
        <label htmlFor="body">
          Body:
          <textarea
            id="body"
            onChange={(e) => setNewBody(e.currentTarget.value)}
            value={newBody}
          />
        </label>
      </div>

      {postsMutation.isError && (
        <div>
          <p>{JSON.stringify(postsMutation.error)}</p>
        </div>
      )}

      <button onClick={handleSubmit} disabled={!newBody || !newTitle}>
        Submit
      </button>
    </form>
  );
};

export default Form;
