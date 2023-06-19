import { PostDetailProps } from './types';

const PostDetail = ({ currentPost, setCurrentPost }: PostDetailProps) => {
  const { body, title } = currentPost ?? { body: '', title: '' };
  return (
    <>
      <button onClick={() => setCurrentPost(null)}>View all posts</button>
      <h1>{title}</h1>
      <p>{body}</p>
    </>
  );
};

export default PostDetail;
