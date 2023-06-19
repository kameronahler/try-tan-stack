import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getPosts } from './api/posts';
import { PostsListProps } from './types';

const KEY_POSTS = 'posts';

const PostsList = ({ setCurrentPost }: PostsListProps) => {
  const postsQuery = useQuery({
    queryKey: [KEY_POSTS],
    queryFn: getPosts,
  });

  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  return (
    <>
      <header>
        <h1>
          {postsQuery.isLoading && 'Loading'}
          {postsQuery.isError && `Error: ${JSON.stringify(postsQuery.error)}`}
          {postsQuery.isSuccess && 'Success'}
        </h1>
      </header>
      <section>
        <h2>Posts:</h2>
        <ol>
          {postsQuery.isSuccess &&
            postsQuery.data.map(({ body, id, title }) => (
              <li key={id}>
                <button onClick={() => setCurrentPost({ body, title })}>
                  {title}
                </button>
              </li>
            ))}
        </ol>
      </section>
      <section>
        <h2>Add new post:</h2>
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
          <button
            onClick={() => window.alert(`${newTitle}, ${newBody}`)}
            disabled={!newBody || !newTitle}
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default PostsList;
