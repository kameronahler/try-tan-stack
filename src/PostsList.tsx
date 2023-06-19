import { useIsFetching, useIsMutating, useQuery } from '@tanstack/react-query';
import Form from './Form';
import { getPosts } from './api/posts';
import { KEY_POSTS } from './constants';
import { PostsListProps } from './types';

const PostsList = ({ setCurrentPost }: PostsListProps) => {
  const postsQuery = useQuery({
    queryKey: [KEY_POSTS],
    queryFn: () => getPosts(),
  });
  const isMutating = useIsMutating({ mutationKey: [KEY_POSTS] });
  const isFetching = useIsFetching({ queryKey: [KEY_POSTS] });
  const isWaiting = isMutating !== 0 || isFetching !== 0;

  return (
    <>
      <header>
        <h1>
          {isWaiting ? 'Loading...' : 'Posts'}
          {postsQuery.isError && `Error: ${JSON.stringify(postsQuery.error)}`}
        </h1>
      </header>

      <section>
        {isWaiting && <h2>List</h2>}
        {!isWaiting && (
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
        )}
      </section>

      <section>
        <h2>Add new post:</h2>
        <Form />
      </section>
    </>
  );
};

export default PostsList;
