import { useQuery } from '@tanstack/react-query';
import { getPosts } from './api/posts';
import { PostsListProps } from './types';

const KEY_POSTS = 'posts';

const PostsList = ({ setCurrentPost }: PostsListProps) => {
  const postsQuery = useQuery({
    queryKey: [KEY_POSTS],
    queryFn: getPosts,
  });

  return (
    <>
      <h1>
        {postsQuery.isLoading && 'Loading'}
        {postsQuery.isError && `Error: ${JSON.stringify(postsQuery.error)}`}
        {postsQuery.isSuccess && 'Success'}
      </h1>
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
    </>
  );
};

export default PostsList;
